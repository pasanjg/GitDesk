import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import queryString from 'query-string';
import axios from 'axios';
import { getLocalStorage, setLocalStorage, getGitHubOauthURL } from '../../utils/Util';

import Sidebar from '../../components/Sidebar/Sidebar';
import About from '../About/About';
import Dashboard from '../Dashboard/Dashboard';
import Profile from '../Profile/Profile';
import Repositories from '../Repositories/Repositories';
import Login from '../Login/Login';
import Header from '../../components/Header/Header';
import './Home.scss';

import Client from '../../utils/Client';
import Search from '../Search/Search';

export class Home extends Component {

	constructor(props) {
		super(props);

		this.getTokenDev.bind(this);
	}

	async componentDidMount() {
		await this.getTokenDev()
	}

	async getTokenDev() {
		let params = queryString.parse(this.props.location.search);
		let code = params.code;

		if (code != null) {
			const apiURL = getGitHubOauthURL() + "/authenticate";
			let token = "";

			await axios({
				method: 'get',
				url: `${apiURL}/${code}`,

				headers: {
					accept: 'application/json'
				}

			}).then((response) => {
				token = response.data.token;
				setLocalStorage('token', token);
				window.location.href = '/dashboard';
			});
		}

	}

	render() {
		const token = getLocalStorage('token');

		return (
			<Router>
				{
					token ? (
						<>
							<Header />
							<div className="main-content">
								<Sidebar />
								<Switch>
									<ApolloProvider client={Client}>
										<Route path="/dashboard" component={Dashboard} />
										<Route path="/search" component={Search} />
										<Route path="/repositories" component={Repositories} />
										<Route path="/profile" component={Profile} />
										<Route path="/about" component={About} />
									</ApolloProvider>
								</Switch>
							</div>
						</>
					) : <Login />
				}
			</Router>
		)
	}
}

export default Home