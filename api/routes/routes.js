const express = require('express');
const Router = express.Router();

// const GitHubController = require('../controllers/githubController');

Router.get('/', (req, res) => {
	res.status(200).json({
		message: "Welcome to MERN API"
	});
});

// users routes
// Router.get('/users', GitHubController.index);
// Router.post('/users', GitHubController.create);
// Router.get('/users/:id', GitHubController.show);
// Router.put('/users/:id', GitHubController.update);
// Router.delete('/users/:id', GitHubController.delete);


module.exports = Router;