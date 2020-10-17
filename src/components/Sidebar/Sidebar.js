import React, { Component } from "react";
import { Link } from "react-router-dom";
import { clearLocalStorage } from '../../utils/Util';
import $ from 'jquery';
import packageJson from '../../../package.json';

import "./Sidebar.scss";
import appLogo from "../../assets/images/appLogo.svg";

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
		clearLocalStorage()
		window.location.href = "/";
	}

	render() {
		return (
			<div>
				<nav className="sidebar">
					<ul className="nav-list">
						<li className="logo">
							<Link to="/home/dashboard">
								<img src={appLogo} alt="" width="45" />
								<label className="logo-title">
									<label>GitDesk</label>
									<label className="version text-muted">v{packageJson.version}</label>
								</label>
							</Link>
						</li>

						<li className={"item " + (window.location.pathname.includes('dashboard') ? 'active' : '')} data-tip="Dashboard" data-for="dashboard">
							<Link to="/home/dashboard">
								<i className="fa fa-home"></i>
								<label className="nav-title">Dashboard</label>
							</Link>
						</li>

						<li className={"item " + (window.location.pathname.includes('repositories') ? 'active' : '')} data-tip="Repositories" data-for="repositories">
							<Link to="/home/repositories">
								<i className="fa fa-book"></i>
								<label className="nav-title">Repositories</label>
							</Link>
						</li>

						<li className={"item " + (window.location.pathname.includes('profile') ? 'active' : '')} data-tip="Profile" data-for="profile">
							<Link to="/home/profile">
								<i className="fa fa-user-circle"></i>
								<label className="nav-title">Profile</label>
							</Link>
						</li>

						<li className={"item " + (window.location.pathname.includes('about') ? 'active' : '')} data-tip="About" data-for="about">
							<Link to="/home/about">
								<i className="fa fa-info-circle"></i>
								<label className="nav-title">About</label>
							</Link>
						</li>

						<li className="item" onClick={this.logout} data-tip="Logout" data-for="logout">
							<i className="fa fa-sign-out-alt"></i>
							<label className="nav-title">Logout</label>
						</li>

						<div className="github" data-tip="View on GitHub" data-for="github"
							onClick={() => {
								// shell.openExternal('https://github.com/pasanjg/GitHub-Desktop')
							}}
						>
							<a href="https://github.com/pasanjg/GitHub-Desktop" target="_blank" rel="noopener noreferrer">
								<i className="fab fa-github"></i>
								<label className="nav-title">GitHub</label>
							</a>
						</div>

					</ul>
				</nav>
			</div>
		);
	}
}

export default Sidebar;
