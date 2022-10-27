const Router = require('express').Router;
const { getAllUniversities, getUniversity, deleteUniversity, modifyUniversity, createUniversity } = require('../controllers/university.controller')
const { enableProtection, authorize } = require('../middlewares/auth')
const route = Router();




route.get('', getAllUniversities);
route.post('', enableProtection, authorize('admin', 'superadmin'), createUniversity);
route.get('/:id', getUniversity);
route.put('/:id', enableProtection, authorize('admin', 'superadmin'), modifyUniversity);
route.delete('/:id', enableProtection, authorize('admin', 'superadmin'), deleteUniversity);


module.exports = route;