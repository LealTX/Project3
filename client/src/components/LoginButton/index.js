import React from "react";
import "./login.css";
import "../../actions/actions.js";

function LoginButton() {
    return (
        <div className="login">
            <a href='http://localhost:8888'>
                <button>Login to Spotify</button>
            </a>
        </div>
    );
}
export default LoginButton;