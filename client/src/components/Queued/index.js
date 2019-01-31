import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import "./style.css";


function Queued(props) {
    return (
        <div>
            <div className="headerQueued col s3">
                <text>Queued Songs</text>
                {/* <ul classname="list-group">
                    {props.addSongs.map(r => (
                        <li className="list-group-item" key={r}>
                            <text>{r}</text>
                        </li>
                    ))}
                </ul> */}
            </div>
        </div>
    );
}

export default Queued;