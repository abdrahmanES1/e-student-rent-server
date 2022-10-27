const Router = require('express').Router;
const { enableProtection, authorize } = require('../middlewares/auth')
const { register, login, getMe, forgetPassword, resetPassword } = require('../controllers/admin.auth.controller')


const route = Router();


route.post('/register', enableProtection, authorize("superadmin"), register);
route.post('/login', login);
route.post('/forgot-password', forgetPassword);
route.post('/reset-password', resetPassword);
route.get('/me', enableProtection, authorize("admin", "superadmin"), getMe);

module.exports = route;