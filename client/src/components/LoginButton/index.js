import React, { Component } from "react";
import "./login.css";
import "../../actions/actions.js";
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

class LoginButton extends Component {
    constructor(props) {
        super(props);
        const params = this.getHashParams();
        const token = params.access_token;
        if (token) {
            spotifyApi.setAccessToken(token);
        }
        this.state = {
            loggIn: token ? true : false,
            token: token,
            displayName: 'Not Here Yet'
        }

        this.getProfile = this.getProfile.bind(this);
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

    getProfile() {
        spotifyApi.getMe()
            .then(data => {
                this.setState({ displayName: `${data.display_name}` })
            }, function(err) {
                console.log('Something went wrong!', err);
            }
        );
    }

    render() {
        const { loggIn } =this.state;

        if(loggIn){
            this.getProfile();
            return (
            <div className="login">
                {this.state.displayName}
            </div>
            );
        }
        else{
            return (
            <div className="login">
            <a href='http://localhost:8888'>
                <button onClick={this.getProfile}>Login to Spotify</button>
            </a>
        </div>
            );
        }

    }
}
export default LoginButton;