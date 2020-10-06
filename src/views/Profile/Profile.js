import React from "react";
import { useQuery } from "@apollo/react-hooks";
import ReactTooltip from "react-tooltip";
import moment from 'moment'
import { FETCH_USER } from "./Queries";

import "./Profile.scss";
import Loader from "../../components/loader/loader";
import ErrorPage from "../../components/error_page/error_page";

export default function Profile() {

	const { data, loading, error } = useQuery(FETCH_USER);
	if (loading)
		return <Loader />;
	else if (error)
		return <ErrorPage error={error} />;
	else {

		const topRepositories = data.viewer.topRepositories;

		return (
			<div className="profile-content ">
				<div className="row m-0">
					<div className="col-12 col-md-8 user-details">
						<div>
							<h1 className="name mt-2">{data.viewer.name}</h1>
							<h4>@{data.viewer.login}</h4>
						</div>
						<div>
							<p className="mt-1">{data.viewer.bio}</p>
							<div className="stats">
								{data.viewer.location ? <span><i className="fa fa-map-marker-alt"></i> &nbsp; {data.viewer.location}</span> : <i></i>}
								{data.viewer.company ? <span><i className="fa fa-building"></i> &nbsp; {data.viewer.company}</span> : <i></i>}
							</div>
						</div>
						<div className="stats">
							<span>{data.viewer.followers.totalCount} Followers</span>
							<span>{data.viewer.following.totalCount} Following</span>
							<span><i className="fa fa-star"></i> {data.viewer.starredRepositories.totalCount} Starred Repositories</span>
						</div>
					</div>
					<div className="col-12 col-md-4">
						<img className="avatar-img" src={data.viewer.avatarUrl} alt="avatar" />
					</div>
				</div>
				<div className="row m-0">
					<div className="top-repositories mt-5 w-100">
						<h6>Top repositories</h6>
						<div className="row mt-4">
							{
								topRepositories.nodes.map((repo, index) => {
									return (
										<div key={index} className="col-md-6">
											<div className="repo-card">
												<div className="details">
													<h5>{repo.name}</h5>
													{repo.isPrivate ? <i className="fa fa-lock"></i> : <i></i>}
												</div>
												<h6 className="text-muted">{repo.nameWithOwner}</h6>
												<div className="languages">
													{
														repo.languages.nodes.map((language, index) => {
															return (
																<span key={index} style={{ backgroundColor: `${language.color}` }}>{language.name}</span>
															);
														})
													}
												</div>
												{repo.description ? <p className="mb-1">{repo.description}</p> : <p className="text-secondary mb-1">No description</p>}
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

