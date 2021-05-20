import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import ReactTooltip from "react-tooltip";
import moment from 'moment'
import { FETCH_USER } from "./Queries";

import "./Profile.scss";
import Loader from "../../components/loader/loader";
import ErrorPage from "../../components/error_page/error_page";

export default function Profile() {

	const { data, loading, error } = useQuery(FETCH_USER);
	// const [isPrimaryLangHover, setIsPrimaryLangHover] = useState(-1);

	if (loading)
		return <Loader />;
	else if (error)
		return <ErrorPage error={error} />;
	else {

		const repositories = data.viewer.repositories.nodes;
		const topRepositories = data.viewer.topRepositories.nodes;

		return (
			<div className="profile-content">
				<div className="container-fluid text-center">
					<div className="profile-cover">
						<div class="cloud">
							{
								repositories.length > 0 &&
								repositories.map((language, index) => {
									let dataWeight = Math.floor(Math.random() * 10) + 1;
									return (
										<>
											{
												language.primaryLanguage != null &&
												<span
													key={index}
													data-weight={dataWeight}
													// onMouseOver={() => setIsPrimaryLangHover(index)}
													// onMouseOut={() => setIsPrimaryLangHover(-1)}
													// style={{ color: isPrimaryLangHover === index ? language.primaryLanguage.color : "" }}
												>
													{language.primaryLanguage.name}
												</span>
											}
										</>
									);
								})
							}
						</div>
					</div>
					<img className="avatar-img" src={data.viewer.avatarUrl} alt="avatar" />
				</div>
				<div className="col-12 text-center">
					<h1 className="name mt-3">{data.viewer.name}</h1>
					<h4>@{data.viewer.login}</h4>
					<div className="bio">
						<p>{data.viewer.bio}</p>
					</div>
				</div>
				<div className="col-12 user-details mt-4">
					<div className="stats">
						<span className="font-weight-bold">{data.viewer.followers.totalCount}</span>
						<span>Followers</span>
					</div>
					<div className="stats">
						<span className="font-weight-bold">{data.viewer.following.totalCount}</span>
						<span>Following</span>
					</div>
					<div className="stats">
						<span className="font-weight-bold">{data.viewer.starredRepositories.totalCount}</span>
						<span>Starred</span>
					</div>
					<div className="stats">
						<span>
							{
								data.viewer.location ?
									<span>
										<svg className="github-icon octicon octicon-location" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
											<path className="gh-icon" fillRule="evenodd" d="M11.536 3.464a5 5 0 010 7.072L8 14.07l-3.536-3.535a5 5 0 117.072-7.072v.001zm1.06 8.132a6.5 6.5 0 10-9.192 0l3.535 3.536a1.5 1.5 0 002.122 0l3.535-3.536zM8 9a2 2 0 100-4 2 2 0 000 4z"></path>
										</svg>
												&nbsp; {data.viewer.location}
									</span> : <i></i>
							}
						</span>
						<span>
							{
								data.viewer.company ?
									<span>
										<svg className="github-icon octicon octicon-organization" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
											<path className="gh-icon" fillRule="evenodd" d="M1.5 14.25c0 .138.112.25.25.25H4v-1.25a.75.75 0 01.75-.75h2.5a.75.75 0 01.75.75v1.25h2.25a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25h-8.5a.25.25 0 00-.25.25v12.5zM1.75 16A1.75 1.75 0 010 14.25V1.75C0 .784.784 0 1.75 0h8.5C11.216 0 12 .784 12 1.75v12.5c0 .085-.006.168-.018.25h2.268a.25.25 0 00.25-.25V8.285a.25.25 0 00-.111-.208l-1.055-.703a.75.75 0 11.832-1.248l1.055.703c.487.325.779.871.779 1.456v5.965A1.75 1.75 0 0114.25 16h-3.5a.75.75 0 01-.197-.026c-.099.017-.2.026-.303.026h-3a.75.75 0 01-.75-.75V14h-1v1.25a.75.75 0 01-.75.75h-3zM3 3.75A.75.75 0 013.75 3h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 3.75zM3.75 6a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM3 9.75A.75.75 0 013.75 9h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 9.75zM7.75 9a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM7 6.75A.75.75 0 017.75 6h.5a.75.75 0 010 1.5h-.5A.75.75 0 017 6.75zM7.75 3a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5z"></path>
										</svg>
												&nbsp; {data.viewer.company}
									</span> : <i></i>
							}
						</span>
					</div>
				</div>
				<div className="row m-0">
					<div className="top-repositories mt-5 w-100">
						<h6>Top repositories</h6>
						<div className="row mt-4">
							{
								topRepositories.map((repo, index) => {
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
									);
								})
							}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

