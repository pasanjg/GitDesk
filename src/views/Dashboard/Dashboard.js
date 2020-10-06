import React from 'react';
import { useQuery } from "@apollo/react-hooks";
import ReactTooltip from "react-tooltip";
import moment from 'moment'
import { FETCH_ACTIVITY } from "./Queries";

import './Dashboard.scss';
import Loader from "../../components/loader/loader";
import ErrorPage from "../../components/error_page/error_page";

export default function Dashboard() {

	const { data, loading, error } = useQuery(FETCH_ACTIVITY);
	if (loading)
		return <Loader />;
	else if (error)
		return <ErrorPage error={error} />;
	else {

		console.log(data);

		const issues = data.viewer.issues;
		const pullRequests = data.viewer.pullRequests;
		const gists = data.viewer.gists;

		return (
			<div className="dashboard-content">
				<div className="row">

					<div className="col-md-4">
						<div className="dash-card">
							<div className="stats">
								<label>Issues</label>
								<span>{issues.totalCount}</span>
							</div>
							<hr />
							<div className="details">
								<i className="text-muted">Total Issues</i>
							</div>
						</div>
					</div>

					<div className="col-md-4">
						<div className="dash-card">
							<div className="stats">
								<label>Pull Requests</label>
								<span>{pullRequests.totalCount}</span>
							</div>
							<hr />
							<div className="details">
								<i className="text-muted">Total Pull Requests</i>
							</div>
						</div>
					</div>

					<div className="col-md-4">
						<div className="dash-card">
							<div className="stats">
								<label>Gists</label>
								<span>{gists.totalCount}</span>
							</div>
							<hr />
							<div className="details">
								<i className="text-muted">Total Gists</i>
							</div>
						</div>
					</div>
				</div>

				<div className="statistics">
					<h6>Statistics</h6>
					<div className="row">

						<div className="col-md-12">
							<div className="stat-card">
								<p>Last 10 Issues</p>
								<hr />
								{
									issues.totalCount === 0 ? <span><i className="text-muted">No Issues</i></span> :
										issues.nodes.map((issue, index) => {
											return (
												<div key={index}>
													<div className="row details">
														<span className="number col text-left">#{issue.number}</span>
														<span className="col text-left">{issue.repository.nameWithOwner}</span>
														<span className="col text-center">{issue.repository.isPrivate ? <i className="fa fa-lock"></i> : <i className="fa fa-globe-asia"></i>}</span>
														<span className="col text-center">{moment(issue.updatedAt).format("MMM Do YYYY")}</span>
														<span className="col text-center"><span className={`state ${issue.state.toLowerCase()}`}>{issue.state}</span></span>
														<span className="col text-right">
															{
																issue.participants.nodes.map((partcipant, index) => {
																	return (
																		<div key={index} className="d-inline">
																			<img className="participant-img" src={partcipant.avatarUrl} alt="avatar" data-tip={partcipant.name} data-for="participant" />
																			<ReactTooltip id="participant" place="right" type="dark" effect="solid"
																			/>
																		</div>
																	);
																})
															}
														</span>
													</div>
													<hr />
												</div>
											);
										})
								}
							</div>
						</div>

						<div className="col-md-12">
							<div className="stat-card">
								<p>Last 10 Pull Requests</p>
								<hr />
								{
									pullRequests.totalCount === 0 ? <span><i className="text-muted">No Pull Requests</i></span> :
										pullRequests.nodes.map((request, index) => {
											return (
												<div key={index}>
													<div className="row details">
														<span className="number col text-left">#{request.number}</span>
														<span className="col text-left">{request.repository.nameWithOwner}</span>
														<span className="col text-center">{request.repository.isPrivate ? <i className="fa fa-lock"></i> : <i className="fa fa-globe-asia"></i>}</span>
														<span className="col text-center">{moment(request.updatedAt).format("MMM Do YYYY")}</span>
														<span className="col text-center"><span className={`state ${request.state.toLowerCase()}`}>{request.state}</span></span>
														<span className="col text-right">
															{
																request.participants.nodes.map((partcipant, index) => {
																	return (
																		<div key={index} className="d-inline">
																			<img className="participant-img" src={partcipant.avatarUrl} alt="avatar" data-tip={partcipant.name} data-for="participant" />
																			<ReactTooltip id="participant" place="right" type="dark" effect="solid"
																			/>
																		</div>
																	);
																})
															}
														</span>
													</div>
													<hr />
												</div>
											);
										})
								}
							</div>
						</div>

						<div className="col-md-12">
							<div className="stat-card">
								<p>Last 10 Gists</p>
								<hr />
								{
									gists.totalCount === 0 ? <span><i className="text-muted">No Gists</i></span> :
										gists.nodes.map((gist, index) => {
											return (
												<div key={index}>
													<div className="row details">
														<span className="name col text-left">{gist.files[0].name}</span>
														<a href={gist.url} target="_blank" rel="noopener noreferrer">
															<span className="col text-right"><i className="fa fa-external-link-alt"></i></span>
														</a>
														<span className="col text-right">{gist.isPublic ? <i className="fa fa-globe-asia"></i> : <i className="fa fa-lock"></i>}</span>
														<span className="col text-right">{gist.isFork ? <i className="fa fa-code-branch"></i> : <i></i>}</span>
														<span className="col text-right">{moment(gist.updatedAt).format("MMM Do YYYY")}</span>
													</div>
													<hr />
												</div>
											);
										})
								}
							</div>
						</div>

					</div>

				</div>

			</div>
		)
	}
}
