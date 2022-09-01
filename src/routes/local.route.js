const Router = require('express').Router;
const { getAllLocals, getLocal, modifyLocal, deleteLocal, createLocal, getLocalReviews , getFiltredLocals} = require('../controllers/local.controller')
const { protected, authorize } = require('../middlewares/auth')
const route = Router();



route.get('', getAllLocals);
route.get('/filter', getFiltredLocals);
route.post('', protected, authorize('user', 'admin') , createLocal);
route.get('/:id', getLocal);
route.put('/:id', protected, authorize('user', 'admin'), modifyLocal);
route.delete('/:id', protected, authorize('user','admin'), deleteLocal);
route.get('/:id/reviews', getLocalReviews );

module.exports = route;