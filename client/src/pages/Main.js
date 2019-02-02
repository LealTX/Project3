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
        console.log(params);
        const token = params.access_token;
        if (token) {
            spotifyApi.setAccessToken(token);
        }
        this.state = {
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
            track: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.searchTracks = this.searchTracks.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    componentDidMount(){
        const songsRef = fire.database().ref('songs');
        songsRef.on('value', (snapshot)=> {
            let addedSongs = snapshot.val();
            let newState = [];
            for (let song in addedSongs){
                newState.push({
                    id: song,
                    track: addedSongs[song].track
                });
            }
            this.setState({
                addedSongs: newState
            })
            })
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
        this.setState({ addedSongs: [...this.state.addedSongs, event.target.value ]});
        console.log("Added Songs: " + this.state.addedSongs);
        this.setState({ searchTrack: '' });
        this.setState({ searchResults: [] });
        const songsRef = fire.database().ref('songs');
        const song = { track: event.target.value }
        songsRef.push(song);
        this.setState({
            track: ''
        });
        // console.log(this.state.searchTrack)
    }

    render() {
        const { albumArt, track, artist } = this.state.nowPlaying;
        const { searchResults, searchTrack, addedSongs } = this.state;

        setTimeout(() => {
            this.getNowPlaying();
        }, 2000);
        return (
            <div>
                <div className="nowPlaying row">
                    <div className="col s5">
                        <NowPlaying
                            albumArt={albumArt}
                            track={track}
                            artist={artist}
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