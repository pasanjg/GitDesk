import React, { Component } from "react";
import "./Login.scss";

export class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isAuthenticated: false,
			code: "",
			loading: false,
			access_token: "",
			username: ""
		}
	}

	async componentDidMount() {

	}

	render() {
		const client_id = 'deb1fe3d3ce3b6964133';

		return (
			<div id="login-content">
				<div className="main">
					<img
						src="https://image.flaticon.com/icons/png/512/25/25231.png"
						alt=""
						width="150"
					/>

					<button className="btn btn-success" onClick={event => { window.location.href = `https://github.com/login/oauth/authorize?client_id=${client_id}& scope=user%20repo`; }}>
						Login with GitHub
					</button>

					{this.state.username}
				</div>
			</div>
		);
	}
}

export default Login;
