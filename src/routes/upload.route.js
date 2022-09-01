const Router = require('express').Router;
const { uploadFile, deleteFile } = require('../controllers/upload.controller')
const { protected, authorize } = require('../middlewares/auth');
const route = Router();


route.use(protected)
route.post('', authorize('user'), uploadFile);
route.delete('', authorize('user', "admin"), deleteFile);

module.exports = route;