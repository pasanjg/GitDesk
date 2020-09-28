import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import About from '../About/About';
import Dashboard from '../Dashboard/Dashboard';
import Profile from '../Profile/Profile';
import Repositories from '../Repositories/Repositories';
import './Home.scss';


export class Home extends Component {
	render() {
		return (
			<Router>
				<div className="row">
					<Sidebar />
					<div className="home-main col">
						<Switch>
							<Route exact path="/home/dashboard" component={Dashboard} />
							<Route exact path="/home/repositories" component={Repositories} />
							<Route exact path="/home/profile" component={Profile} />
							<Route exact path="/home/about" component={About} />
							<Redirect to="/home/dashboard" />
						</Switch>
					</div>
				</div>
			</Router>
		)
	}
}

export default Home
