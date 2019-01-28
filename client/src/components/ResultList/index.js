import React from "react";

function ResultList(props) {
    return (
        <ul clasName="list-group">
            {props.searchResults.map(r => (
                <li className="list-group-item" key={r.id}>
                    <button key={r.id} onClick={props.onSelect}>{r}</button>
                </li>
            ))}
        </ul>
    );

}

export default ResultList;