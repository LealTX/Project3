import React from "react";
import "./style.css";


function Queued(props) {
    return (
        <div>
            <div className="divQueued col s3">
                <text className="headerQueued">Queued Songs</text>
                <ul classname="list-group">
                    {props.addedSongs.map(r => (
                        <li className="list-group-item" key={r}>
                            <text>{r.track}</text>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Queued;