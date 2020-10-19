import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import { getLocalStorage, setLocalStorage } from '../../utils/Util';

import Sidebar from '../../components/Sidebar/Sidebar';
import About from '../About/About';
import Dashboard from '../Dashboard/Dashboard';
import Profile from '../Profile/Profile';
import Repositories from '../Repositories/Repositories';
import './Home.scss';

import { ApolloProvider } from '@apollo/react-hooks';
import client from '../../utils/client';
import Login from '../Login/Login';
import Searchbar from '../../components/Searchbar/Searchbar';

export class Home extends Component {

	constructor(props) {
		super(props);

		this.getToken.bind(this);
	}

	async componentDidMount() {
		await this.getToken()
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
				token = response.data.token;
				console.log(token);
				setLocalStorage('token', token);
				window.location.href = '/home/dashboard';
			});
		}


	}

	render() {
		const token = getLocalStorage('token');
		console.log(token);
		return (
			<Router>
				{
					token ? (
						<>
							<Sidebar />
							<div className="main-content">
								<Searchbar />
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
						</>
					) : <Login />
				}
			</Router>
		)
	}
}

export default Home