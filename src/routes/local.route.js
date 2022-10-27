const Router = require('express').Router;
const { getAllLocals, getLocal, modifyLocal, deleteLocal, createLocal, getLocalReviews , getFiltredLocals} = require('../controllers/local.controller')
const { enableProtection, authorize } = require('../middlewares/auth')
const route = Router();



route.get('', getAllLocals);
route.get('/filter', getFiltredLocals);
route.post('', enableProtection, authorize('student') , createLocal);
route.get('/:id', getLocal);
route.put('/:id', enableProtection , authorize('student'), modifyLocal);
route.delete('/:id', enableProtection, authorize('student', 'admin', 'superadmin'), deleteLocal);
route.get('/:id/reviews', getLocalReviews );

module.exports = route;