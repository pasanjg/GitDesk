import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import { setLocalStorage } from '../../utils/Util';

import Sidebar from '../../components/Sidebar/Sidebar';
import About from '../About/About';
import Dashboard from '../Dashboard/Dashboard';
import Profile from '../Profile/Profile';
import Repositories from '../Repositories/Repositories';
import './Home.scss';

import { ApolloProvider } from '@apollo/react-hooks';
import client from '../../utils/client';

export class Home extends Component {

	constructor(props) {
		super(props);

		this.state = {
			token: '',
			username: ''
		}

		this.getToken.bind(this);
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

				setLocalStorage('token', token);
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
							<ApolloProvider client={client}>
								<Route path="/home/dashboard" component={Dashboard} />
								<Route path="/home/repositories" component={Repositories} />
								<Route path="/home/profile" component={Profile} />
								<Route path="/home/about" component={About} />
								<Redirect to="/home/dashboard" />
							</ApolloProvider>
						</Switch> 
					</div>
				</div>
			</Router>
		)
	}
}

export default Home