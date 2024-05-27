const express = require('express');
const userControllers = require('../controllers/userControllers');
const router = express.Router();

app.use(express.static('public'));

Router.get('/',userControllers.view);