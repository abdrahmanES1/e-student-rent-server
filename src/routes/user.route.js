const Router = require('express').Router;
const { getAllUsers, getUser, modifyUser, deleteUser} = require('../controllers/user.controller')
const { protected, authorize } = require('../middlewares/auth')
const route = Router();

route.get('', getAllUsers);
route.get('/:id', getUser);
route.put('/:id', modifyUser);
route.delete('/:id' , deleteUser);
module.exports = route;