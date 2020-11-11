const express = require('express');
const Router = express.Router();

const GitHubController = require('../controllers/githubController');

Router.get('/', (req, res) => {
	res.status(200).json({
		message: "Welcome to MERN API",
		env: process.env
	});
});

// GitHub routes
Router.get('/authenticate/:code', GitHubController.authenticate);


module.exports = Router;