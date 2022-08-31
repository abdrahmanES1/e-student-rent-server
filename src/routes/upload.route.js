const Router = require('express').Router;
const { uploadFile, deleteFile } = require('../controllers/upload.controller')

const route = Router();

route.post('/uploads', uploadFile);
route.delete('/uploads', deleteFile);

module.exports = route;