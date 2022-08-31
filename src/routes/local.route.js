const Router = require('express').Router;
const { getAllLocals, getLocal, modifyLocal, deleteLocal, createLocal, getLocalReviews } = require('../controllers/local.controller')
const { protected, authorize } = require('../middlewares/auth')
const route = Router();

route.get('', getAllLocals);
route.post('', createLocal);
route.get('/:id', getLocal);
route.put('/:id', modifyLocal);
route.delete('/:id', deleteLocal);
route.get('/:id/reviews', getLocalReviews );

module.exports = route;