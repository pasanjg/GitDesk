import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './views/Home/Home.js';
import * as serviceWorker from './serviceWorker';
import Login from './views/Login/Login.js';

import './assets/scss/styles.scss';
import OAuth from "./views/OAuth/OAuth.js";


const routing = (
  <Router>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/github/callback" component={OAuth} />
      <Route path="/" component={Home} />
      <Redirect to="/login" />
    </Switch>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
