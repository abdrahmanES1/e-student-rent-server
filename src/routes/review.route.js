const Router = require('express').Router;
const { getAllReviews, getReview, modifyReview, deleteReview, createReview } = require('../controllers/review.controller')
const { protected ,  authorize }= require('../middlewares/auth')
const route = Router();


route.get('', getAllReviews);
route.post('', createReview);
route.get('/:id', getReview);
route.put('/:id', protected, authorize('user'), modifyReview);
route.delete('/:id', protected, authorize('user', 'admin'), deleteReview);


// get user reviews
module.exports = route;