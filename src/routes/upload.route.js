const Router = require('express').Router;
const { uploadFile, deleteFile } = require('../controllers/upload.controller')
const { enableProtection, authorize } = require('../middlewares/auth');
const route = Router();


route.use(enableProtection)
route.post('', authorize('user'), uploadFile);
route.delete('', authorize('user', "admin"), deleteFile);

module.exports = route;