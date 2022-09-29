const Router = require('express').Router;
const { getAllReviews, getReview, modifyReview, deleteReview, createReview } = require('../controllers/review.controller')
const { enableProtection ,  authorize }= require('../middlewares/auth')
const route = Router();


route.get('', getAllReviews);
route.post('', createReview);
route.get('/:id', getReview);
route.put('/:id', enableProtection, authorize('user'), modifyReview);
route.delete('/:id', enableProtection, authorize('user', 'admin'), deleteReview);


// get user reviews
module.exports = route;