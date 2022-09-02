const Router = require('express').Router;
const { getAllUsers, getUser, modifyUser, deleteUser, getUserLocals} = require('../controllers/user.controller')
const { protected, authorize } = require('../middlewares/auth')
const route = Router();

route.get('', protected, authorize ('admin'), getAllUsers);
route.get('/:id', getUser);
route.get('/:id/locals', getUserLocals);
route.put('/:id', authorize('user', 'admin'), modifyUser);
route.delete('/:id', protected, authorize('user', 'admin') , deleteUser);
module.exports = route;