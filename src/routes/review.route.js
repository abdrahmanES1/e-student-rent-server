const Router = require('express').Router;
const { getAllReviews, getReview, modifyReview, deleteReview, createReview } = require('../controllers/review.controller')
const { protected ,  authorize }= require('../middlewares/auth')
const route = Router();

// route.use(protected);
route.get('', getAllReviews);
route.post('', createReview);
route.get('/:id', getReview);
route.put('/:id', modifyReview);
route.delete('/:id', deleteReview);


// get user reviews
module.exports = route;