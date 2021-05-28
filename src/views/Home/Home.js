import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import queryString from 'query-string';
import axios from 'axios';
import { getLocalStorage, setLocalStorage, getGitHubOauthURL } from '../../utils/Util';

import Sidebar from '../../components/Sidebar/Sidebar.js';
import About from '../About/About.js';
import Dashboard from '../Dashboard/Dashboard.js';
import Profile from '../Profile/Profile.js';
import Repositories from '../Repositories/Repositories.js';
import Login from '../Login/Login.js';
import Search from '../Search/Search';
import Header from '../../components/Header/Header.js';
import './Home.scss';

import Client from '../../utils/Client';

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
      <Router basename={'/'}>
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
                  <Redirect to="/dashboard" />
                </Switch>
              </div>
            </>
          ) : <Login />
        }
      </Router>
    )
  }
}

export default Home;