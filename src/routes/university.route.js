const Router = require('express').Router;
const { getAllUniversities, getUniversity, deleteUniversity, modifyUniversity, createUniversity } = require('../controllers/university.controller')
const { protected, authorize } = require('../middlewares/auth')
const route = Router();



route.use(protected);
route.get('', getAllUniversities);
route.post('', authorize('admin'), createUniversity);
route.get('/:id', getUniversity);
route.put('/:id', authorize('admin'), modifyUniversity);
route.delete('/:id', authorize('admin'), deleteUniversity);


module.exports = route;