import React, { Component } from "react";
import { Link } from "react-router-dom";
import $ from 'jquery';

import "./Sidebar.scss";

// const { shell } = window.require('electron');

export class Sidebar extends Component {

  constructor(props) {
    super(props)
    $(document).on('click', '.item', function (e) {
      $(this).addClass('active').siblings().removeClass('active');
    });
  }

  logout = (e) => {
    e.preventDefault()
    localStorage.removeItem('token');
    window.location.href = "/";
  }

  render() {
    return (
      <div>
        <nav className="sidebar">
          <ul className="nav-list">
            <li className={"item " + (window.location.pathname.includes('dashboard') ? 'active' : '')} data-tip="Dashboard" data-for="dashboard">
              <Link to="/dashboard">
                <i className="fa fa-home"></i>
                <label className="nav-title">Dashboard</label>
              </Link>
            </li>

            <li className={"item " + (window.location.pathname.includes('repositories') ? 'active' : '')} data-tip="Repositories" data-for="repositories">
              <Link to="/repositories">
                <i className="fa fa-book"></i>
                <label className="nav-title">Repositories</label>
              </Link>
            </li>

            <li className={"item " + (window.location.pathname.includes('profile') ? 'active' : '')} data-tip="Profile" data-for="profile">
              <Link to="/profile">
                <i className="fa fa-user-circle"></i>
                <label className="nav-title">Profile</label>
              </Link>
            </li>

            <li className={"item " + (window.location.pathname.includes('about') ? 'active' : '')} data-tip="About" data-for="about">
              <Link to="/about">
                <i className="fa fa-info-circle"></i>
                <label className="nav-title">About</label>
              </Link>
            </li>

            <li className="item" onClick={this.logout} data-tip="Logout" data-for="logout">
              <i className="fa fa-sign-out-alt"></i>
              <label className="nav-title">Logout</label>
            </li>

            <li className="github" data-tip="View on GitHub" data-for="github">
              <a href="https://github.com/pasanjg/GitDesk" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
                <label className="nav-title">GitHub</label>
              </a>
            </li>

          </ul>
        </nav>
      </div>
    );
  }
}

export default Sidebar;
