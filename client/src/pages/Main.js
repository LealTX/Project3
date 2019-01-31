import React, { Component } from "react";
import SpotifyWebApi from 'spotify-web-api-js';
import SearchContainer from "../components/SearchContainer";
import NowPlaying from "../components/NowPlaying";
import "./style.css";

const spotifyApi = new SpotifyWebApi();

class Main extends Component {
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
        const { albumArt, track, artist } = this.state.nowPlaying;
        setTimeout(() => {
            this.getNowPlaying();
        }, 2000);
        return (
            <div className="nowPlaying row">
                <div className="col s6">
                    <NowPlaying 
                        albumArt={albumArt}
                        track={track}
                        artist={artist}
                    />
                </div>
                <div className="search col s6">
                    <SearchContainer />
                </div>
            </div>
        );
    }
}
export default Main;