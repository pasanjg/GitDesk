import React, { Component } from 'react';

import './Dashboard.scss'

export class Dashboard extends Component {
	render() {
		console.log(this.props.token);
		return (
			<div className="dashboard-content">
				<div className="row">
					<div className="col">{this.props.token}</div>
				</div>
			</div>
		)
	}
}

export default Dashboard
