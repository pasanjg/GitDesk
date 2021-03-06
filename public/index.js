import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './styles.scss';
import Home from './views/Home/Home';
import * as serviceWorker from './serviceWorker';
import About from './views/About/About';
import Login from './views/Login/Login';

const routing = (
	<Router>
		<Switch>
			<Route exact path="/" component={Login} />
			<Route exact path="/github/callback" component={Home} />
			<Route path="/home" component={Home} />
			<Route path="/about" component={About} />
			<Redirect to="/" />
		</Switch>
	</Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
