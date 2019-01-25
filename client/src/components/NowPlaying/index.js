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
                albumArt: ''
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
                        name: response.item.name,
                        albumArt: response.item.album.images[0].url,
                        artist: response.item.artists[0].name
                        
                    }
                });
                console.log(response)
            })
    }

    render() {
        return (
            <div>
                Now Playing: {this.state.nowPlaying.name}<td />
                Artist: {this.state.nowPlaying.artist}<td />
                <img src={this.state.nowPlaying.albumArt} alt="Album Art" style={{ height: 150 }} />
                <td />
                <button onClick={() => this.getNowPlaying()}>
                    Check Now Playing
                </button>
            </div>
        );
    }
}
export default NowPlaying;