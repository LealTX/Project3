import React from "react";
import "./style.css";


function Queued(props) {
    return (
        <div>
            <div className="divQueued col s3">
                <text className="headerQueued">Queued Songs</text>
                <ul className="list-group">
                    {props.addedSongs.map(r => (
                        <li className="list-group-item" key={r.id}>
                            {r.track}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Queued;