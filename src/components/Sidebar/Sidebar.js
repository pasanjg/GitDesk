import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { clearLocalStorage } from '../../utils/Util';
import packageJson from '../../../package.json';

import "./Sidebar.scss";
import appLogo from "../../assets/images/appLogo.svg";

// const { shell } = window.require('electron');

export class Sidebar extends Component {

	logout = (e) => {
		e.preventDefault()
		clearLocalStorage()
		window.location.href = "/";
	}

	render() {
		return (
			<div>
				<nav className="sidebar">
					<ul className="navlist">
						<Link to="/home/dashboard">
							<li className="logo">
								<img src={appLogo} alt="" width="45" />
							</li>
						</Link>
						<Link to="/home/dashboard">
							<li className="item" data-tip="Dashboard" data-for="dashboard">
								<i className="fa fa-home"></i>
							</li>
							<ReactTooltip
								id="dashboard"
								place="right"
								type="dark"
								effect="solid"
							/>
						</Link>
						<Link to="/home/repositories">
							<li
								className="item"
								data-tip="Repositories"
								data-for="repositories"
							>
								<i className="fa fa-book"></i>
							</li>
							<ReactTooltip
								id="repositories"
								place="right"
								type="dark"
								effect="solid"
							/>
						</Link>
						<Link to="/home/profile">
							<li className="item" data-tip="Profile" data-for="profile">
								<i className="fa fa-user-circle"></i>
							</li>
							<ReactTooltip
								id="profile"
								place="right"
								type="dark"
								effect="solid"
							/>
						</Link>
						<Link to="/home/about">
							<li className="item" data-tip="About" data-for="about">
								<i className="fa fa-info-circle"></i>
							</li>
							<ReactTooltip id="about" place="right" type="dark" effect="solid" />
						</Link>


						<li className="item" onClick={this.logout} data-tip="Logout" data-for="logout">
							<i className="fa fa-sign-out-alt"></i>
						</li>
						<ReactTooltip id="logout" place="right" type="dark" effect="solid" />


						<div className="github" data-tip="View on GitHub" data-for="github"
							onClick={() => {
								// shell.openExternal('https://github.com/pasanjg/GitHub-Desktop')
							}}
						>
							<i className="fab fa-github"></i>
							<span className="version">v{packageJson.version}</span>
						</div>
						<ReactTooltip id="github" place="right" type="dark" effect="solid" />
					</ul>
				</nav>
			</div>
		);
	}
}

export default Sidebar;
