import React, { Component } from 'react';
import queryString from 'query-string';
import axios from 'axios';
import { setLocalStorage, getGitHubOAuthURL, getLocalStorage } from '../../utils/Util.js';
import githubLogo from '../../assets/images/githubLogo.svg';
import octocatSpinner from '../../assets/images/octocat-spinner.gif';
import './OAuth.scss';

export class OAuth extends Component {

  constructor(props) {
    super(props);

    this.getTokenDev.bind(this);
  }

  async componentDidMount() {
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
        <div className="main">
          <img src={githubLogo} alt="logo" width="150" />
          <img src={octocatSpinner} alt="octocat" width="60" />
          <code className="text-center">Hold on!<br />We're resolving your promise.</code>
        </div>
      </div>
    )
  }
}

export default OAuth;
