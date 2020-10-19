import React from 'react';

import './Searchbar.scss';

export default function Searchbar() {
	return (
		<div className="search-content">
			<div className="search">
				<input className="search-input" type="text" placeholder="Search" />
				<button className="btn search-btn"><i className="fa fa-search"></i></button>
			</div>
			<div className="search-filter">
				{/* <h3>Other content</h3> */}
			</div>
		</div>
	)
}
