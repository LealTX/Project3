import React from "react";
import "../../actions/actions.js";
import "./style.css";


function NowPlaying(props) {
    return (
        <div>
            <td className="albumDiv">
                <img className="albumArt" src={props.albumArt} alt="Album Art" style={{ height: 200 }} />
            </td>
            <td className="track">
                    <b>Now Playing:</b> {props.track}<br /><b>Artist: </b>{props.artist}<br />
                    <button onClick={props.onPlayClick}>Play/Pause</button>
                    <button onClick={props.onNextClick}>Next</button>
            </td>
        </div>
    );
}
export default NowPlaying;