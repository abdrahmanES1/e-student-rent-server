const Router = require('express').Router;
const { getAllUsers, getUser, modifyUser, deleteUser, getUserLocals } = require('../controllers/user.controller')
const { enableProtection, authorize } = require('../middlewares/auth')
const route = Router();

route.get('', getAllUsers);
route.get('/:id', getUser);
route.get('/:id/locals', getUserLocals);
route.put('/:id', enableProtection, authorize('user', 'admin', 'superadmin'), modifyUser);
route.delete('/:id', enableProtection, authorize('user', 'admin', 'superadmin'), deleteUser);
module.exports = route;