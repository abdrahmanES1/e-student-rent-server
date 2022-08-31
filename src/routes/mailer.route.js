const Router = require('express').Router;
const postEmail = require('../controllers/mailer.controller')


const route = Router();
route.post('', postEmail);


module.exports = route;