import React, { Component } from "react";
import {Icon} from 'react-materialize'
import "./login.css";
import "../../actions/actions.js";
import SpotifyWebApi from 'spotify-web-api-js';
import "./login.css"

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
                    <nav>
                    <div className="nav-wrapper titleText">
                        <ul className="left hide-on-med-and-down"><Icon left>music_note</Icon>
                            Party Vibes
                        </ul>
                    <ul className="right hide-on-med-and-down loginDisplay">
                        <li><Icon left>person</Icon>{this.state.displayName}</li>
                    </ul>
                    </div>
                </nav>
              </div>
            );
            
        }
        else{
            return (
                <div>
                <nav>
                <div className="nav-wrapper titleText">
                    <ul className="left hide-on-med-and-down"><Icon left>music_note</Icon>
                        Party Vibes
                    </ul>
                    <ul className="right hide-on-med-and-down loginDisplay">
                        <li><a href='https://secure-sierra-79189.herokuapp.com/login'><Icon left>person</Icon>Login to Spotify!</a></li>
                    </ul>
                </div>
            </nav>
          </div>
            );
        }
    }
}
export default LoginButton;