import React, { Component } from "react";
import "../../actions/actions.js";
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

class NowPlaying extends Component {
    constructor() {
        super();
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
            }
        }
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

    render() {
        return (
            <div className="nowPlaying">
            <div className="track">
                Now Playing: {this.state.nowPlaying.track}
            </div>
            <div className="artist">
                Artist: {this.state.nowPlaying.artist}
            </div>
            <div className="albumArt">
                <img src={this.state.nowPlaying.albumArt} alt="Album Art" style={{ height: 150 }} />
            </div>
            <div className="buttonCheck">
                <button onClick={() => this.getNowPlaying()}>
                    Check Now Playing
                </button>
            </div>
            </div>
        );
    }
}
export default NowPlaying;