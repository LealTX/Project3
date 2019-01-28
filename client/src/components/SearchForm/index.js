import React from "react";

function Search(props) {
    return (
        <form>
            <input
                type="text"
                value={props.searchTrack}
                onChange={props.onChange}
            />
            <button onClick={props.search}>Search</button>
        </form>
    );
}

export default Search;