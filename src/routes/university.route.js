const Router = require('express').Router;
const { getAllUniversities, getUniversity, deleteUniversity, modifyUniversity, createUniversity } = require('../controllers/university.controller')

const route = Router();

route.get('/universities', getAllUniversities);
route.get('/universities/:id', getUniversity);
route.post('/universities', createUniversity);
route.put('/universities/:id', modifyUniversity);
route.delete('/universities/:id', deleteUniversity);

module.exports = route;