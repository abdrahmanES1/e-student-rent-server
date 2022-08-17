const Router = require('express').Router;
const { protected } = require('../middlewares/auth')
const { register, login, getMe } = require('../controllers/auth.controller')


const route = Router();


route.post('/register', register);
route.post('/login', login);
route.get('/me', protected , getMe);

module.exports = route;