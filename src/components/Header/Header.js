import React from 'react';
import packageJson from '../../../package.json';

import appLogo from "../../assets/images/appLogo.svg";

import './Header.scss';

export default function Searchbar() {
	return (
		<div className="search-content">
			<div className="logo">
				<img src={appLogo} alt="" width="45" />
				<div className="logo-title">
					<span>GitDesk</span>
					<span className="version text-muted">v{packageJson.version}</span>
				</div>
			</div>
			<div className="search-filter">
				{/* <h3>Search Filters</h3> */}
			</div>
			<div className="search">
				<input className="search-input" type="text" placeholder="Search" />
				<button className="btn search-btn"><i className="fa fa-search"></i></button>
			</div>
		</div>
	)
}
