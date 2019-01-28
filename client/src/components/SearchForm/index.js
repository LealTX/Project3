import React from "react";
import { Button, Icon } from 'react-materialize';

function Search(props) {
    return (
        <div class="input-field col s6">
            <input
                type="text"
                value={props.searchTrack}
                onChange={props.onChange}
            />
            <label for="searchMusic">Search Tracks or Artists</label>
            <Button waves='light'onClick={props.search}>Search<Icon left>search</Icon></Button>
        </div>
    );
}

export default Search;