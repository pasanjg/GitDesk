const express = require('express');
const Router = express.Router();

Router.get('/', function (req, res) {
    res.json({ message: 'Welcome to MERN Stack' });
});

module.exports = Router;
