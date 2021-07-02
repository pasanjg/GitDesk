import React from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { getLocalStorage } from '../../utils/Util';

import Sidebar from '../../components/Sidebar/Sidebar.js';
import About from '../About/About.js';
import Dashboard from '../Dashboard/Dashboard.js';
import Profile from '../Profile/Profile.js';
import Repositories from '../Repositories/Repositories.js';
import Login from '../Login/Login.js';
import Search from '../Search/Search';
import Header from '../../components/Header/Header.js';

import Client from '../../utils/Client';

import './Home.scss';

export default function Home() {
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
                  <Route exact path="/dashboard" component={Dashboard} />
                  <Route exact path="/search" component={Search} />
                  <Route exact path="/repositories" component={Repositories} />
                  <Route exact path="/profile" component={Profile} />
                  <Route exact path="/about" component={About} />
                </ApolloProvider>
                <Redirect to="/dashboard" />
              </Switch>
            </div>
          </>
        ) : <Login />
      }
    </Router>
  );
}
