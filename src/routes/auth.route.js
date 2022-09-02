const Router = require('express').Router;
const { protected } = require('../middlewares/auth')
const { register, login, getMe , forgetPassword, resetPassword } = require('../controllers/auth.controller')


const route = Router();


route.post('/register', register);
route.post('/login', login);
route.post('/forget-password', forgetPassword);
route.post('/reset-password', resetPassword);
route.get('/me', protected , getMe);

module.exports = route;