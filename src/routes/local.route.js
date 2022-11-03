const Router = require('express').Router;
const { getAllLocals, getLocal, modifyLocal, deleteLocal, createLocal, getLocalReviews , getFiltredLocals} = require('../controllers/local.controller')
const { enableProtection, authorize } = require('../middlewares/auth')
const route = Router();



route.get('', getAllLocals);
route.get('/filter', getFiltredLocals);
route.post('', enableProtection, authorize('landlord') , createLocal);
route.get('/:id', getLocal);
route.put('/:id', enableProtection, authorize('landlord'), modifyLocal);
route.delete('/:id', enableProtection, authorize('landlord', 'admin', 'superadmin'), deleteLocal);
route.get('/:id/reviews', getLocalReviews );

module.exports = route;