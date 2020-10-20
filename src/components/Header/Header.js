import React, { useState, useEffect } from 'react';
import packageJson from '../../../package.json';

import appLogo from "../../assets/images/appLogo.svg";

import './Header.scss';

export default function Searchbar() {

	const [count, setCount] = useState(0);

	// Similar to componentDidMount and componentDidUpdate:
	useEffect(() => {
		// Update the document title using the browser API
		if (document.getElementById("toggle").classList.contains('fa-moon'))
			document.getElementById("toggle").classList.toggle('fa-sun');
		else
			document.getElementById("toggle").classList.toggle('fa-moon');
	});

	return (
		<div className="header-content">
			<div className="logo">
				<img src={appLogo} alt="" width="45" />
				<div className="logo-title">
					<span>GitDesk</span>
					<span className="version text-muted">v{packageJson.version}</span>
				</div>
			</div>
			<div className="search">
				<input className="search-input" type="text" placeholder="Search" />
				<button className="btn search-btn"><i className="fa fa-search"></i></button>
			</div>
			<div className="search-filter">
				{/* <h3>Search Filters</h3> */}
			</div>
			<div className="toggle-mode">
				<i id="toggle" className="icon fa fa-moon"></i>
				<input type="checkbox" id="switch" onClick={() => setCount(count + 1)} />
				<label for="switch" >Toggle</label>
			</div>
		</div>
	)
}
