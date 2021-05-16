import React from 'react';
import { useLocation } from "react-router-dom";
import './Search.scss';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

export default function Search() {
	let query = useQuery();
	const search = query.get("q");

	return (
		<div className="search-content">

			{!search && (
				<div className="search-intro">
					<h3>Search anything across GitHub</h3>
				</div>
			)}

			{search && (
				<div className="">
					<h1>SEARCH : {search}</h1>
				</div>
			)}

		</div>
	)
}
