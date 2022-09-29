const Router = require('express').Router;
const { getAllUniversities, getUniversity, deleteUniversity, modifyUniversity, createUniversity } = require('../controllers/university.controller')
const { enableProtection, authorize } = require('../middlewares/auth')
const route = Router();




route.get('', getAllUniversities);
route.post('', enableProtection, authorize('admin'), createUniversity);
route.get('/:id', getUniversity);
route.put('/:id', enableProtection, authorize('admin'), modifyUniversity);
route.delete('/:id', enableProtection, authorize('admin'), deleteUniversity);


module.exports = route;