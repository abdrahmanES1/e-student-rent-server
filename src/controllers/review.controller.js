const { default: mongoose  } = require('mongoose');
const asyncHandler = require('../middlewares/async');
const Review = require('../models/review.model');
const ErrorResponse = require('../utils/errorResponse');

const getAllReviews = asyncHandler(async (req, res, next) => {
    const { populate } = req.query;
    const reviews = await Review.find().populate(populate);

    res.status(200).send({
        "success": true,
        reviews
    });
})

const getReview = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { populate } = req.query;

    if (!mongoose.isValidObjectId(id)) {
        return next(new ErrorResponse("id not valid", 403));
    }

    const review = await Review.findById(id).populate(populate);

    if(!review) { return next(new ErrorResponse('Review Does Not Exist', 403)) }

    res.status(200).send({
        "success": true,
        review
    });
    
});

const deleteReview = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        return next(new ErrorResponse("Review id not valid", 403));
    }

    const review = await Review.deleteOne({ _id: id });

    if (review.deletedCount == 0) {
        return next(new ErrorResponse("Review Not Found", 403))
    }

    return res.status(200).send({
        "success": true,
        review
    });

});

const modifyReview = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { description, rating, local, user } = req.body;

    if (!mongoose.isValidObjectId(id)) {
        return next(new ErrorResponse("Review id not valid", 403));
    }

    const review = await Review.findByIdAndUpdate(id, { description, rating, local, user });

    if (!review) { return next(new ErrorResponse('Review Does Not Found', 403)) }

    return res.status(200).send({
        "success": true,
        review
    });
});

const createReview = asyncHandler(async (req, res, next) => {
    const { description, rating, local, user } = req.body;

    if (!(description && rating && local && user)) {
        return next(new ErrorResponse('All Fields is Required', 403))
    }

    const review = await Review.create({
        description, rating, local, user
    })


    res.status(200).send({
        "success": true,
        review
    })
})

module.exports = { getAllReviews, getReview, deleteReview, modifyReview, createReview };