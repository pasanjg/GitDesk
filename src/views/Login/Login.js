import React, { Component } from "react";
import githubLogo from '../../assets/images/githubLogo.svg';
import { getLocalStorage } from "../../utils/Util";
import "./Login.scss";

export class Login extends Component {

	constructor() {
		super();
		this.checkAuthentication.bind(this);
	}

	componentDidMount() {
		this.checkAuthentication();
	}

	checkAuthentication() {
		var token = getLocalStorage('token');

		if (token !== null) {
			console.log('Authorized');
			window.location.href = "/home/dashboard"
		}
	}

	render() {
		const CLIENT_ID = 'deb1fe3d3ce3b6964133';

		return (
			<div id="login-content">
				<div className="main">
					<img src={githubLogo} alt="logo" width="150" />
					<code className="text-center">Just Login. We'll callback you. <br /> It's a promise!</code>
					<button className="btn login-btn"
						onClick={e => {
							window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user%20repo%20read:org`;
						}}>
						Login with GitHub
					</button>
				</div>
			</div>
		);
	}
}

export default Login;
