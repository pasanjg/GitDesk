import React from 'react';

import './About.scss';
import appLogo from "../../assets/images/appLogo.svg";

// const { shell } = window.require('electron');

export default function About() {
	return (
		<div id="about-content">
				<div className="main">
					<img
						src={appLogo}
						alt=""
						width="150"
					/>
					<p className="mt-4">
						GitHub Desktop client <br />
						Built with React <br />
						<a href="https://github.com/pasanjg/GitHub-Desktop" target="_blank" rel="noopener noreferrer">
							<code onClick={() => {
								// shell.openExternal('https://github.com/pasanjg/GitHub-Desktop')
							}}>View source code on Github</code>
						</a>
					</p>
					<div className="badges">
						<img src="https://github.com/pasanjg/GitHub-Desktop/workflows/CI/badge.svg" alt="actions" />
						<img src="https://img.shields.io/github/tag/pasanjg/GitHub-Desktop.svg?label=version" alt="version" />
					</div>
					<div className="react mt-2">
						<i className="fab fa-react react mr-2"></i>
						<i className="fa fa-heart heart text-danger"></i>
					</div>
				</div>
			</div>
	)
}

