import React, { Component } from "react";
import { render } from 'react-dom';
import "../../actions/actions.js";
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();


const Result = ({ searchResults }) => {
    return searchResults.map(r => <div>{r}</div>);
}

const Search = (props) => {
    const {
        searchTrack,
        onChange,
        search
    } = props;

    return <div>
        <input
            type="text"
            value={searchTrack}
            onChange={onChange}
        />
        <button onClick={search}>Search</button>
    </div>;
}

class Playback extends Component {
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
            searchTrack: '',
            results: [0,1,2,3,4],
            searchResults: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.searchTracks = this.searchTracks.bind(this);
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

    searchTracks(search) {
        console.log(search);
        spotifyApi.searchTracks(search)
            .then( data => {
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
        console.log('A name was submitted: ' + this.state.searchTrack);
        setTimeout(() => {
            this.searchTracks(this.state.searchTrack);
            event.preventDefault();
        }, 1000)
        
    }

    render() {
        const { searchResults, searchTrack } = this.state;

        return (
            <div>
            <Search
              searchTrack={searchTrack}
              onChange={this.handleChange}
              search={this.handleSubmit}
            />
            <Result searchResults={searchResults} />
          </div>
        );
    }
}
export default Playback;