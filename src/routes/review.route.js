const Router = require('express').Router;
const { getAllReviews, getReview, modifyReview, deleteReview, createReview } = require('../controllers/review.controller')
const { protected ,  authorize }= require('../middlewares/auth')
const route = Router();

// route.use(protected);
route.get('/reviews', getAllReviews);
route.get('/reviews/:id', getReview);
route.post('/reviews', createReview);
route.put('/reviews/:id', modifyReview);
route.delete('/reviews/:id', deleteReview);


// get user reviews
module.exports = route;