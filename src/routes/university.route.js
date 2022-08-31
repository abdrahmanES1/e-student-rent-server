const Router = require('express').Router;
const { getAllUniversities, getUniversity, deleteUniversity, modifyUniversity, createUniversity } = require('../controllers/university.controller')

const route = Router();

route.get('', getAllUniversities);
route.post('', createUniversity);
route.get('/:id', getUniversity);
route.put('/:id', modifyUniversity);
route.delete('/:id', deleteUniversity);





module.exports = route;