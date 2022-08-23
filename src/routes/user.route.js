const Router = require('express').Router;
const { getAllUsers, getUser, modifyUser, deleteUser} = require('../controllers/user.controller')
const { protected, authorize } = require('../middlewares/auth')
const route = Router();

route.get('/users', getAllUsers);
route.get('/users/:id', getUser);
route.put('/users/:id', modifyUser);
route.delete('/users/:id',protected , deleteUser);
module.exports = route;