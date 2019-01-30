import React, { Component } from "react";
import "../../actions/actions.js";
import SpotifyWebApi from 'spotify-web-api-js';
import SearchContainer from '../SearchContainer'
import "./style.css";

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
        setTimeout(() => {
            this.getNowPlaying();
        }, 2000);
        return (
            <div className="nowPlaying row">
                <td className="albumDiv col s3">
                    <img className="albumArt" src={this.state.nowPlaying.albumArt} alt="Album Art" style={{ height: 200 }} />
                </td>
                <td className="track col s3">
                    <text>
                        <b>Now Playing:</b> {this.state.nowPlaying.track}<br /><b>Artist: </b>{this.state.nowPlaying.artist}
                    </text>
                </td>
                <td className="search col s6">
                    <SearchContainer />
                </td>
            </div>
        );
    }
}
export default NowPlaying;