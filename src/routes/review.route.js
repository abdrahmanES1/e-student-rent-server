const Router = require('express').Router;
const { getAllReviews, getReview, modifyReview, deleteReview, createReview } = require('../controllers/review.controller')

const route = Router();

route.get('/reviews', getAllReviews);
route.get('/reviews/:id', getReview);
route.post('/reviews', createReview);
route.put('/reviews/:id', modifyReview);
route.delete('/reviews/:id', deleteReview);

// get post reviews
// get user reviews
module.exports = route;