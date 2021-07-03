import React, { Component } from 'react';
import queryString from 'query-string';
import axios from 'axios';
import { setLocalStorage, getGitHubOAuthURL, getLocalStorage } from '../../utils/Util.js';
import Loader from "../../components/loader/loader.js";

import githubLogoBlack from '../../assets/images/githubLogoBlack.svg';
import githubLogoWhite from '../../assets/images/githubLogoWhite.svg';
import './OAuth.scss';

export class OAuth extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ghIcon: githubLogoWhite,
    };

    this.getTokenDev.bind(this);
  }

  async componentDidMount() {
    if (localStorage.getItem("mode") === "dark") {
      document.body.classList.toggle('dark');
      this.setState({ ghIcon: githubLogoWhite });
    } else {
      this.setState({ ghIcon: githubLogoBlack });
    }

    await this.getTokenDev();
  }

  async getTokenDev() {
    let params = queryString.parse(this.props.location.search);
    let code = params.code;
    let token = getLocalStorage("token");

    console.log(code)

    if (code != null) {
      const apiURL = getGitHubOAuthURL() + "/authenticate";
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

    } else {
      if (token != null) {
        window.location.href = '/dashboard';
      } else {
        window.location.href = '/login';
      }
    }
  }

  render() {
    return (
      <div className="login-content">
        <div className="card main">
          <img src={this.state.ghIcon} className="mt-5" alt="logo" width="150" />
          <div className="loading">
            <Loader />
          </div>
          <code className="text-center mb-4">Hold on!<br />We're resolving the promise.</code>
        </div>
      </div>
    )
  }
}

export default OAuth;
