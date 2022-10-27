const Router = require('express').Router;
const { getAllReviews, getReview, modifyReview, deleteReview, createReview } = require('../controllers/review.controller')
const { enableProtection ,  authorize }= require('../middlewares/auth')
const route = Router();


route.get('', getAllReviews);
route.post('', createReview);
route.get('/:id', getReview);
route.put('/:id', enableProtection, authorize('student'), modifyReview);
route.delete('/:id', enableProtection, authorize('student', 'admin', 'superadmin'), deleteReview);


// get user reviews
module.exports = route;