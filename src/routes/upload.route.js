const Router = require('express').Router;
const { uploadFile, deleteFile } = require('../controllers/upload.controller')

const route = Router();

route.post('', uploadFile);
route.delete('', deleteFile);

module.exports = route;