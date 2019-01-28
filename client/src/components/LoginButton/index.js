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

        if(this.state.loggIn) {
            this.getProfile();
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

    getProfile() {
        spotifyApi.getMe()
            .then(data => {
                let display_Name =  data.display_name;
                display_Name = display_Name.charAt(0).toUpperCase() + display_Name.slice(1);
                this.setState({ displayName: `${display_Name}` })
            }, function(err) {
                console.log('Something went wrong!', err);
            }
        );
    }

    render() {
        const { loggIn } =this.state;

        if(loggIn){
            return (
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="navbar-brand">Party Vibes</div>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <div className="nav-link">Home</div>
                            </li>
                            </ul>
                            <form className="form-inline my-2 my-lg-0">
                               <b>Username</b>: {this.state.displayName}
                            </form>
                        </div>
                    </nav>
                </div>
            );
            
        }
        else{
            return (
                <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="navbar-brand">Party Vibes</div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <div className="nav-link">Home</div>
                        </li>
                        </ul>
                        <div className="form-inline my-2 my-lg-0">
                            <a href='http://localhost:8888'>
                                <button>Login to Spotify</button>
                            </a>
                        </div>
                    </div>
                </nav>
            </div>
            );
        }

    }
}
export default LoginButton;