import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Login.scss";

export class Login extends Component {
	render() {
		return (
			<div id="login">
				<div className="main">
					<img
						src="https://image.flaticon.com/icons/png/512/25/25231.png"
						alt=""
						width="150"
					/>
					<Link to="/home">
						<button className="btn btn-success">Login with GitHub</button>
					</Link>
				</div>
			</div>
		);
	}
}

export default Login;
