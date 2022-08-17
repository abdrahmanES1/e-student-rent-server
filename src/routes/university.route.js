const Router = require('express').Router;
const {getAllUniversities, getUniversity, deleteUniversity} = require('../controllers/university.controller')

const route = Router();

route.get('/universities', getAllUniversities);
route.get('/universities/:id', getUniversity);
route.delete('/universities/:id', deleteUniversity);

module.exports = route;