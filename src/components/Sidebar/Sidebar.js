import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import "./Sidebar.scss";

import githubWhite from "../../assets/images/github-white.svg";

export class Sidebar extends Component {
	render() {
		return (
			<nav className="sidebar">
				<ul className="navlist">
					<Link to="/">
						<li className="logo">
							<img src={githubWhite} alt="" width="45" />
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
							<i className="fa fa-user"></i>
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
				</ul>
			</nav>
		);
	}
}

export default Sidebar;
