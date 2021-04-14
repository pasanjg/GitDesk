import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import packageJson from '../../../package.json';

import appLogo from "../../assets/images/appLogo.svg";

import './Header.scss';

export default function Searchbar() {

	const [count, setCount] = useState(0);
	const [search, setSearch] = useState("");

	// Similar to componentDidMount and componentDidUpdate:
	useEffect(() => {
		if (document.getElementById("toggle").classList.contains('fa-moon'))
			document.getElementById("toggle").classList.toggle('fa-sun');
		else
			document.getElementById("toggle").classList.toggle('fa-moon');
	}, [count]);

	function handleSearch(e) {
		e.preventDefault();
		window.location.href = `/search?q=${search}`;
	}

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
				<form onSubmit={(e) => handleSearch(e)}>
					<input className="search-input" name="q" value={search} type="search" onChange={(e) => setSearch(e.target.value)} placeholder="Search" />
					<button type="submit" className="btn search-btn"><i className="fa fa-search"></i></button>
				</form>
			</div>
			<div className="search-filter">
				{/* <h3>Search Filters</h3> */}
			</div>
			<div className="toggle-mode">
				<i id="toggle" className="icon fa fa-moon"></i>
				<input type="checkbox" id="switch" onClick={() => setCount(count + 1)} />
				<label htmlFor="switch" >Toggle</label>
			</div>
		</div>
	)
}
