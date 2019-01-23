
import React from 'react';
import "./header.css";


const Header = () => (
  <div className="jumbotron jumbotron-fluid">
    <div className="text-right mr-5">
      <button type="button" className="btn btn-success">Log In</button>
    </div>
    <div className="container text-center">
      <h1 className="display-4">Party Vibes!</h1>
      <p className="lead">Submit on Vote on the Next Song at your Party!</p>
    </div>
  </div>
);
export default Header;