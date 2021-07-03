import React, { Component } from "react";
import { getGitHubClientID, getLocalStorage } from "../../utils/Util";
import githubLogoWhite from '../../assets/images/githubLogoWhite.svg';
import githubLogoBlack from '../../assets/images/githubLogoBlack.svg';
import "./Login.scss";

export class Login extends Component {

  constructor() {
    super();

    this.state = {
      ghIcon: githubLogoWhite,
    };

    this.checkAuthentication.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem("mode") === "dark") {
      document.body.classList.toggle('dark');
      this.setState({ghIcon: githubLogoWhite});
    } else {
      this.setState({ghIcon: githubLogoBlack});
    }

    this.checkAuthentication();
  }

  checkAuthentication() {
    var token = getLocalStorage('token');

    if (token !== null) {
      window.location.href = "/dashboard"
    }
  }

  render() {
    const CLIENT_ID = getGitHubClientID();

    return (
      <div className="login-content">
        <div className="card main">
          <img src={this.state.ghIcon} alt="logo" width="150" />
          <code className="text-center">Just Login. We'll callback you. <br /> It's a promise!</code>
          <button className="btn login-btn"
            onClick={e => {
              window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user%20repo%20read:org`;
            }}>
            Login with GitHub
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
