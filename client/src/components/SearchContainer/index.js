import React, { Component } from "react";
import "../../actions/actions.js";
import Search from "../SearchForm";
import ResultList from "../ResultList";
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

class Playback extends Component {
    constructor(props) {
        super(props);
        const params = this.getHashParams();
        const token = params.access_token;
        if (token) {
            spotifyApi.setAccessToken(token);
        }
        this.state = {
            loggIn: token ? true : false,
            searchTrack: '',
            results: [0, 1, 2, 3, 4],
            searchResults: [],
            searchKey: '',
            addedSong: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.searchTracks = this.searchTracks.bind(this);
        this.onSelect = this.onSelect.bind(this);
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
        console.log('A name was submitted: ' + this.state.searchTrack);
        setTimeout(() => {
            this.searchTracks(this.state.searchTrack);
            event.preventDefault();
        }, 1000)
    }

    onSelect(event) {
        this.setState({ addedSong: event.target.value })
        setTimeout(() => {
            console.log(this.state.addedSong);
        }, 1000)
        this.setState({ searchTrack: '' })
        this.setState({ searchResults: [] })
        // console.log(this.state.searchTrack)
    }

    render() {
        const { searchResults, searchTrack } = this.state;

        return (
            <div>
                <td className="searchText">
                    <Search
                        searchTrack={searchTrack}
                        onChange={this.handleChange}
                        search={this.handleSubmit}
                    />
                </td>
                <td className="results">
                    <ResultList
                        searchResults={searchResults}
                        onSelect={this.onSelect}
                    />
                </td>
            </div>
        );
    }
}
export default Playback;