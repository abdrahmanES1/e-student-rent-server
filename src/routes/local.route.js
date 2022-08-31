const Router = require('express').Router;
const { getAllLocals, getLocal, modifyLocal, deleteLocal, createLocal, getLocalReviews } = require('../controllers/local.controller')
const { protected, authorize } = require('../middlewares/auth')
const route = Router();

route.get('/locals', getAllLocals);
route.get('/locals/:id', getLocal);
route.post('/locals', createLocal);
route.put('/locals/:id', modifyLocal);
route.delete('/locals/:id', deleteLocal);
route.get('/locals/:id/reviews', getLocalReviews );

module.exports = route;