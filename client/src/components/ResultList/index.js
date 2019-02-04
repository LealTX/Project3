import React from "react";
import { Button } from 'react-materialize';
import "./style.css";

function ResultList(props) {
    return (
        <ul className="list-group">
            {props.searchResults.map(r => (
                <li className="list-group-item" key={r}>
                    <Button className="matButton" 
                        key={r.id} 
                        value={r}
                        onClick={props.onSelect}
                        >
                        {r}
                        </Button>
                </li>
            ))}
        </ul>
    );

}

export default ResultList;