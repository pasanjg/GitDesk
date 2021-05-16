import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import ReactTooltip from "react-tooltip";
import moment from 'moment'
import Dropdown from 'react-dropdown';
import { FETCH_REPOSITORIES } from "./Queries.js"

import "./Repositories.scss";
import Loader from "../../components/loader/loader";
import ErrorPage from "../../components/error_page/error_page";

const Repositories = ({ token }) => {

	// const [keyword,setKeyword] = useState('');

	const dropDownOptions = [
		{ value: 'CREATED_AT', label: 'Created At' },
		{ value: 'UPDATED_AT', label: 'Updated At' },
		{ value: 'PUSHED_AT', label: 'Pushed At' },
		{ value: 'NAME', label: 'Name' },
		{ value: 'STARGAZERS', label: 'Stargazers' },
	];
	const dropDownDirection = [
		{ value: 'ASC', label: 'Ascending' },
		{ value: 'DESC', label: 'Descending' },
	];
	const [selectedOption, setDropdownOption] = useState(dropDownOptions[0], '');
	const [selectedDirection, setDirection] = useState(dropDownDirection[1], '');

	const { data, loading, error } = useQuery(FETCH_REPOSITORIES(selectedOption.value, selectedDirection.value),
	);



	if (loading)
		return <Loader />;
	else if (error)
		return <ErrorPage error={error} />;
	else {
		const repositories = data.viewer.repositories;
		const totalCount = repositories.totalCount;

		return (
			<div className="repository-content">
				<div className="row m-0 d-flex align-items-center justify-content-between">
					<div className="col col-md-6">
						<p className="title">Repositories ({totalCount})</p>
					</div>
					<div className="dropdown">
						<div className="col">
							<Dropdown options={dropDownOptions} onChange={select => setDropdownOption(select)} value={selectedOption.label} placeholder="Select an option" />
						</div>
						<div className="col">
							<Dropdown options={dropDownDirection} onChange={select => setDirection(select)} value={selectedDirection.label} placeholder="Select an Direction" />
						</div>
					</div>
				</div>

				<div className="row m-0">
					{
						repositories.nodes.map((repo, index) => {
							return (
								<div key={index} className="col-md-6">
									<div className="repo-card">
										<div className="details">
											<h5 className="title">{repo.name}</h5>
											{repo.isPrivate ? <i className="fa fa-lock"></i> : <i></i>}
											{repo.isFork ? <div className="forked">Fork</div> : <i></i>}
										</div>
										<h6 className="text-muted text-owner">{repo.nameWithOwner}</h6>
										<div className="languages">
											{
												repo.languages.nodes.length > 0 ?
													repo.languages.nodes.map((language, index) => {
														return (
															<span key={index} style={{ backgroundColor: `${language.color}` }}>{language.name}</span>
														);
													}) :
													<span key={index} style={{ backgroundColor: "#313131" }}>N/A</span>
											}
										</div>
										<div className="row repo-stats">
											<div className="col-2 p-0">
												<svg className="github-icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
													<path className="gh-icon" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z">
													</path>
												</svg>
												{repo.forks.totalCount}
											</div>
											<div className="col-2 p-0">
												<svg className="github-icon" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true">
													<path className="gh-icon" d="M1.679 7.932c.412-.621 1.242-1.75 2.366-2.717C5.175 4.242 6.527 3.5 8 3.5c1.473 0 2.824.742 3.955 1.715 1.124.967 1.954 2.096 2.366 2.717a.119.119 0 010 .136c-.412.621-1.242 1.75-2.366 2.717C10.825 11.758 9.473 12.5 8 12.5c-1.473 0-2.824-.742-3.955-1.715C2.92 9.818 2.09 8.69 1.679 8.068a.119.119 0 010-.136zM8 2c-1.981 0-3.67.992-4.933 2.078C1.797 5.169.88 6.423.43 7.1a1.619 1.619 0 000 1.798c.45.678 1.367 1.932 2.637 3.024C4.329 13.008 6.019 14 8 14c1.981 0 3.67-.992 4.933-2.078 1.27-1.091 2.187-2.345 2.637-3.023a1.619 1.619 0 000-1.798c-.45-.678-1.367-1.932-2.637-3.023C11.671 2.992 9.981 2 8 2zm0 8a2 2 0 100-4 2 2 0 000 4z">
													</path>
												</svg>
												{repo.watchers.totalCount}
											</div>
											<div className="col-2 p-0">
												<svg className="github-icon" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true">
													<path className="gh-icon" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z">
													</path>
												</svg>
												{repo.stargazers.totalCount}
											</div>
											<div className="col-2 p-0">
												<svg className="github-icon" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true">
													<path className="gh-icon" d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 3a1 1 0 11-2 0 1 1 0 012 0zm-.25-6.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z">
													</path>
												</svg>
												{repo.openIssues.totalCount}
											</div>
											<div className="col-2 p-0">
												<svg className="github-icon" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true">
													<path className="gh-icon" d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z">
													</path>
												</svg>
												{repo.openPullRequest.totalCount}
											</div>
										</div>
										<div className="description">
											{repo.description ? <p className="mb-1">{repo.description}</p> : <p className="text-secondary mb-1">No description</p>}
										</div>
										<div className="meta">
											<div className="collaborators">
												<span className="text-muted">Built by </span>
												{
													repo.collaborators.nodes.map((collaborator, index) => {
														return (
															<div key={index} className="d-inline">
																<img className="collaborator-img" src={collaborator.avatarUrl} alt="avatar" data-tip={collaborator.name} data-for="collaborator" />
																<ReactTooltip id="collaborator" place="right" type="dark" effect="solid"
																/>
															</div>
														);
													})
												}
											</div>
											<div className="text-muted">Updated: {moment(repo.updatedAt).format("MMM Do YYYY")}</div>
										</div>
									</div>
								</div>
							)
						})
					}
				</div>
			</div>
		)
	}
}
export default Repositories;
