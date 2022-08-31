const { default: mongoose } = require('mongoose');
const asyncHandler = require('../middlewares/async');
const Local = require('../models/local.model');
const Review = require('../models/review.model');
const ErrorResponse = require('../utils/errorResponse');
const { deleteImage } = require('../utils/fileUpload');

const getAllLocals = asyncHandler(async (req, res, next) => {
    const { populate } = req.query;
    const locals = await Local.find().populate(populate);

    res.status(200).send({
        "success": true,
        locals
    });
})

const getLocal = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { populate } = req.query;

    if (!mongoose.isValidObjectId(id)) {
        return next(new ErrorResponse("id not valid", 403));
    }

    const local = await Local.findById(id).populate(populate);

    if (!local) { return next(new ErrorResponse('Local Does Not Exist', 403)) }

    res.status(200).send({
        "success": true,
        local
    });

});

const deleteLocal = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return next(new ErrorResponse("Local id not valid", 403));
    }

    const local = await Local.findByIdAndDelete(id);

    await deleteImage(local.images);

    if (local.deletedCount == 0) {
        return next(new ErrorResponse("Local Not Found", 403))
    }

    return res.status(200).send({
        "success": true,
        local
    });

});

const modifyLocal = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { title, description, adresse, price, nbrRooms, images, localisation, user, universities } = req.body;

    if (!mongoose.isValidObjectId(id)) {
        return next(new ErrorResponse("Local id not valid", 403));
    }

    const local = await Local.findOneAndUpdate(id, { title, description, adresse, price, nbrRooms, images, localisation, user, universities });

    if (!local) { return next(new ErrorResponse('Local Does Not Found', 403)) }


    return res.status(200).send({
        "success": true,
        local
    });
});

const createLocal = asyncHandler(async (req, res, next) => {
    const { title, description, adresse, price, nbrRooms, localisation, user, universities, images } = req.body;

    if (!(description && title && adresse && price && user && nbrRooms && localisation && universities && images)) {
        return next(new ErrorResponse('All Fields is Required', 403))
    }

    const local = await Local.create({
        title, description, adresse, price, nbrRooms, localisation, user, images, universities
    })

    res.status(200).send({
        "success": true,
        local
    })
})

// TODO : get all reviews for a post
const getLocalReviews = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const reviews = await Review.find({local: id});

    res.status(200).send({
        "success": true,
        reviews
    })
})


module.exports = { getAllLocals, getLocal, deleteLocal, modifyLocal, createLocal, getLocalReviews };



