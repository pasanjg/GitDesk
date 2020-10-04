import React, { Component } from "react";
import axios from 'axios';

import "./Profile.scss";

export class Profile extends Component {

	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			token: localStorage.getItem('token'),
			name: '',
			username: '',
			email: '',
			avatarUrl: '' 
		}

		this.getUser = this.getUser.bind(this);
	}

	componentDidMount() {
		this.getUser();
	}

	async getUser() {

		if (this.state.token === '' || this.state.response === '') {
			this.setState({
				loading: true
			});
		}

		var query = `query { viewer { login, name, email, avatarUrl }}`;

		await axios({
			method: 'post',
			url: 'https://api.github.com/graphql',
			headers: {
				'Authorization': `Bearer ${this.state.token}`,
				'Content-Type': 'application/json'
			},
			data: JSON.stringify({ query: query })
		}).then((response) => {
			this.setState({
				username: response.data.data.viewer.login,
				name: response.data.data.viewer.name,
				avatarUrl: response.data.data.viewer.avatarUrl,
				loading: false
			});
		});
	}

	render() {
		return (
			<div>
				<p>{this.state.name}</p>
				<p>{this.state.username}</p>
				<img src={this.state.avatarUrl} alt="" width="200" />
			</div>
		);
	}
}

export default Profile;
