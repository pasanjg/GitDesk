import React, { Component } from 'react';
import axios from 'axios';

import './Dashboard.scss';

export class Dashboard extends Component {

	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			token: localStorage.getItem('token'),
			response: ''
		}

		this.graphAPI = this.graphAPI.bind(this);
	}

	async componentDidMount() {
		await this.graphAPI();
	}

	async graphAPI() {

		if (this.state.token === '' || this.state.response === '') {
			this.setState({
				loading: true
			});
		}

		var query = `query { viewer { login }}`;

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
				response: JSON.stringify({ response }),
				loading: false
			});
		});
	}

	render() {
		console.log(this.state.token);
		return (
			<div className="dashboard-content">
				{
					this.state.loading ? <p>Loading...</p> :
						<div className="row">
							<div className="col">{this.state.token}</div>
							<div className="col">Res: {this.state.response}</div>
						</div>
				}
			</div>
		)
	}
}

export default Dashboard
