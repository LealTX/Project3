import React, { Component } from "react";
import SpotifyWebApi from 'spotify-web-api-js';
import Search from "../components/SearchForm";
import ResultList from "../components/ResultList";
import NowPlaying from "../components/NowPlaying";
import Queued from "../components/Queued";
import fire from '../fire';
import "./style.css";

const spotifyApi = new SpotifyWebApi();

class Main extends Component {
    constructor(props) {
        super(props);
        const params = this.getHashParams();
        const token = params.access_token;
        if (token) {
            spotifyApi.setAccessToken(token);
        }
        this.state = {
            token: token,
            loggIn: token ? true : false,
            nowPlaying: {
                name: 'Not Checked',
                albumArt: '',
                track: '',
                artist: ''
            },
            searchTrack: '',
            results: [0, 1, 2, 3, 4],
            searchResults: [],
            searchKey: '',
            addedSongs: [],
            track: '',

            deviceId: "",
            loggedIn: false,
            error: "",
            trackName: "Track Name",
            artistName: "Artist Name",
            albumName: "Album Name",
            playing: false,
            position: 0,
            duration: 0,
        }

        this.playerCheckInterval = null
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.searchTracks = this.searchTracks.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onPlayClick=this.onPlayClick.bind(this);
        this.onNextClick=this.onNextClick.bind(this);
        this.handleLogin=this.handleLogin.bind(this);
    }

    componentDidMount() {
        const songsRef = fire.database().ref('songs');
        songsRef.on('value', (snapshot) => {
            let addedSongs = snapshot.val();
            let newState = [];
            for (let song in addedSongs) {
                newState.push({
                    id: song,
                    track: addedSongs[song].track
                });
            }
            this.setState({
                addedSongs: newState
            })
        })
        this.handleLogin()
        return
    }

    handleLogin() {
        if (this.state.token !== "") {
            this.setState({ loggedIn: true });
            this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 3000);
        }
    }

    onStateChanged(state) {
        if (state !== null) {
          const {
            current_track: currentTrack,
            position,
            duration,
          } = state.track_window;
          const trackName = currentTrack.name;
          const albumName = currentTrack.album.name;
          const artistName = currentTrack.artists
            .map(artist => artist.name)
            .join(", ");
          const playing = !state.paused;
          this.setState({
            position,
            duration,
            trackName,
            albumName,
            artistName,
            playing
          });
        } else {
          this.setState({ error: "Looks like you might have swapped to another device?" });
        }
      }

    checkForPlayer() {
        const { token } = this.state;

        if (window.Spotify !== null) {
            clearInterval(this.playerCheckInterval);
            this.player = new window.Spotify.Player({
                name: "Jacob's Spotify Player",
                getOAuthToken: cb => { cb(token); },
            });
            this.createEventHandlers();
            this.player.connect();
        }
    }

    createEventHandlers() {
        this.player.on('initialization_error', e => { console.error(e); });
        this.player.on('authentication_error', e => {
            console.error(e);
            this.setState({ loggedIn: false });
        });
        this.player.on('account_error', e => { console.error(e); });
        this.player.on('playback_error', e => { console.error(e); });

        this.player.on('player_state_changed', state => this.onStateChanged(state));

        this.player.on('ready', async data => {
            let { device_id } = data;
            console.log("Let the music play on!");
            await this.setState({ deviceId: device_id });
            console.log(device_id)
            this.transferPlaybackHere();
        });
    }

    transferPlaybackHere() {
        const { deviceId, token } = this.state;
        // https://beta.developer.spotify.com/documentation/web-api/reference/player/transfer-a-users-playback/
        fetch("https://api.spotify.com/v1/me/player", {
            method: "PUT",
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "device_ids": [deviceId],
                // true: start playing music if it was paused on the other device
                // false: paused if paused on other device, start playing music otherwise
                "play": true,
            }),
        });
    }
      
      onPlayClick() {
        this.player.togglePlay();
      }
      
      onNextClick() {
        this.player.nextTrack();
      }

    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        e = r.exec(q)
        while (e) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
            e = r.exec(q);
        }
        return hashParams;

    }

    getNowPlaying() {
        spotifyApi.getMyCurrentPlaybackState()
            .then((response) => {
                this.setState({
                    nowPlaying: {
                        track: response.item.name,
                        albumArt: response.item.album.images[0].url,
                        artist: response.item.artists[0].name

                    }
                });
            })
    }

    searchTracks(search) {
        console.log(search);
        spotifyApi.searchTracks(search)
            .then(data => {
                this.setState({
                    searchResults: [
                        `${data.tracks.items[0].artists[0].name} - ${data.tracks.items[0].name}`,
                        `${data.tracks.items[1].artists[0].name} - ${data.tracks.items[1].name}`,
                        `${data.tracks.items[2].artists[0].name} - ${data.tracks.items[2].name}`,
                        `${data.tracks.items[3].artists[0].name} - ${data.tracks.items[3].name}`
                    ]
                })
            }, function (err) {
                console.error(err);
            });
    }


    handleChange(event) {
        this.setState({ searchTrack: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        setTimeout(() => {
            this.searchTracks(this.state.searchTrack);
            event.preventDefault();
        }, 1000)
    }

    onSelect(event) {
        this.setState({ addedSongs: [...this.state.addedSongs, event.target.value] });
        console.log("Added Songs: " + this.state.addedSongs);
        this.setState({ searchTrack: '' });
        this.setState({ searchResults: [] });
        const songsRef = fire.database().ref('songs');
        const song = { track: event.target.value }
        songsRef.push(song);
        this.setState({
            track: ''
        });
    }



    render() {
        const { albumArt, track, artist } = this.state.nowPlaying;
        const { searchResults, searchTrack, addedSongs } = this.state;

        setTimeout(() => {
            this.getNowPlaying();
        }, 6000);
        return (
            <div>
                <div className="nowPlaying row">
                    <div className="col s5">
                        <NowPlaying
                            albumArt={albumArt}
                            track={track}
                            artist={artist}
                            onPlayClick={this.onPlayClick}
                            onNextClick={this.onNextClick}
                        />
                    </div>
                    <div className="search col s3">
                        <Search
                            searchTrack={searchTrack}
                            onChange={this.handleChange}
                            search={this.handleSubmit}
                        />
                    </div>
                    <div className="results col s4">
                        <ResultList
                            searchResults={searchResults}
                            onSelect={this.onSelect}
                        />
                    </div>
                </div>
                <div className="queued row">
                    <Queued
                        addedSongs={addedSongs}
                    />
                </div>
            </div>
        );
    }
}
export default Main;