import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';

import Sidebar from '../../components/Sidebar/Sidebar';
import About from '../About/About';
import Dashboard from '../Dashboard/Dashboard';
import Profile from '../Profile/Profile';
import Repositories from '../Repositories/Repositories';
import './Home.scss';
import Login from '../Login/Login';
import { ApolloProvider } from '@apollo/react-hooks';
import client from '../../utils/client';

export class Home extends Component {

	constructor(props) {
		super(props);

		this.state = {
			token: '',
			username: ''
		}
	}

	componentDidMount() {
		this.getToken()
	}


	async getToken() {

		let params = queryString.parse(this.props.location.search);
		let code = params.code;


		if (code != null) {

			console.log('Code:', code);

			const apiURL = "http://oauth-gh.herokuapp.com/authenticate/";
			let token = "";

			await axios({
				method: 'get',
				url: `${apiURL}${code}`,

				headers: {
					accept: 'application/json'
				}

			}).then((response) => {
				console.log('Home', 'Token: ', response.data.token);

				token = response.data.token;

				localStorage.setItem('token', token);
			});
		}


	}

	render() {
		return (
			<Router>
				<div className="row">
					<Sidebar />
					<div className="home-main col">
						<Switch>
							<Route path="/home/dashboard" component={Dashboard} />
							<ApolloProvider client={client}>
								<Repositories token={localStorage.getItem("token")} />
							</ApolloProvider>
							<Route path="/home/profile" component={Profile} />
							<Route path="/home/about" component={About} />
							<Route path="/" component={Login} />
							<Redirect to="/home/dashboard" />
						</Switch>
					</div>
				</div>
			</Router>
		)
	}
}

export default Home