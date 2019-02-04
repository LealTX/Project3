import React from "react";
import "../../actions/actions.js";
import { Button, Icon} from 'react-materialize'
import "./style.css";


function NowPlaying(props) {
    return (
        <div>
            <td className="albumDiv">
                <img className="albumArt" src={props.albumArt} alt="Album Art" style={{ height: 200 }} />
            </td>
            <td className="track">
                    <b>Now Playing:</b> {props.track}<br /><b>Artist: </b>{props.artist}<br />
                    <Button className="matButton" onClick={props.onPlayClick}><Icon>play_arrow</Icon></Button>
                    <Button className="matButton" onClick={props.onNextClick}><Icon>skip_next</Icon></Button>
            </td>
        </div>
    );
}
export default NowPlaying;