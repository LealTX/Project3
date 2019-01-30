import React from "react";
import { Button } from 'react-materialize';
import "./style.css";

function ResultList(props) {
    return (
        <ul clasName="list-group">
            {props.searchResults.map(r => (
                <li className="list-group-item" key={r}>
                    <Button
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