
import React, { Component } from 'react';
import "./main.css";

class MainGameContainer extends Component {
	state = {
		message: "Click Here to Log In!",
	};

	OnClickLogin = () => {
		console.log("clicked")
	};

	render() {
		return (
			<div className="container-fluid mainCardContainer">
				<div className="gameMessage text-center">
				</div>
				<div className="gameScores text-center">
					<p>Score: {this.state.score} | Top Score: {this.state.topScore}</p>
				</div>
				<div className="container">

					<div className="row">

					</div>

				</div>
			</div>
		);
	}
};

export default MainGameContainer;