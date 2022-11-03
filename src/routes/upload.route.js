const Router = require('express').Router;
const { uploadFile, deleteFile } = require('../controllers/upload.controller')
const { enableProtection, authorize } = require('../middlewares/auth');
const route = Router();


route.use(enableProtection)
route.post('', authorize('landlord'), uploadFile);
route.delete('', authorize('landlord', "admin", 'superadmin'), deleteFile);

module.exports = route;