const Router = require('express').Router;

const { register, login, getMe } = require('../controllers/auth.controller')


const route = Router();


route.post('/register', register);
route.post('/login', login);
route.post('/me', getMe);

module.exports = route;