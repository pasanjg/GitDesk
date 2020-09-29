import React, { Component } from "react";
import axios from 'axios';

import "./Profile.scss";

export class Profile extends Component {

	constructor(props) {
		super(props);

		this.state = {
			name: '',
			username: '',
			avatar_url: ''
		}
	}

	componentDidMount() {
		this.getUser();
	}

	async getUser() {
		const { token } = this.props;

		await axios({
			method: 'get',
			url: `https://api.github.com/user`,
			headers: {
				Authorization: 'token ' + token
			}

		}).then((response) => {
			console.log('Response: ', response);
			this.setState({
				name: response.data.name,
				username: response.data.login,
				avatar_url: response.data.avatar_url
			});
			console.log(this.state.username);
			console.log(this.state.avatar_url);
		})
	}

	render() {
		return (
			<div>
				<p>{this.state.name}</p>
				<p>{this.state.username}</p>
				<img src={this.state.avatar_url} alt="" width="200" />
			</div>
		);
	}
}

export default Profile;
