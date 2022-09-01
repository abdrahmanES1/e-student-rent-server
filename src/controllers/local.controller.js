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
    const { title, description, adresse, price, area, nbrRooms, images, localisation, user, universities } = req.body;

    if (!mongoose.isValidObjectId(id)) {
        return next(new ErrorResponse("Local id not valid", 403));
    }

    const local = await Local.findOneAndUpdate(id, { title, description, adresse, price, area, nbrRooms, images, localisation, user, universities });

    if (!local) { return next(new ErrorResponse('Local Does Not Found', 403)) }


    return res.status(200).send({
        "success": true,
        local
    });
});

const createLocal = asyncHandler(async (req, res, next) => {
    const { title, description, adresse, price, area, nbrRooms, localisation, user, universities, images } = req.body;

    if (!(description && title && adresse && price && area && user && nbrRooms && localisation && universities && images)) {
        return next(new ErrorResponse('All Fields is Required', 403))
    }

    const local = await Local.create({
        title, description, adresse, price, area, nbrRooms, localisation, user, images, universities
    })

    res.status(200).send({
        "success": true,
        local
    })
})

const getLocalReviews = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const reviews = await Review.find({ local: id });

    res.status(200).send({
        "success": true,
        reviews
    })
})

const getFiltredLocals = asyncHandler(async (req, res, next) => {
    const { q } = req.query;

    let filter = {
        "$and": [
            {
                $or: [
                    { adresse: { $regex: '^' + q, $options: 'i' } },
                    { title: { $regex: '^' + q, $options: 'i' } },
                ]
            }
        ]
    };

    for (const key in req.query) {
        if (key != 'q') { filter["$and"].push({ [key]: { $lte: parseFloat(req.query[key]) } }) }
    }

    console.log(filter);
    const locals = await Local.find(filter).sort()

    res.status(200).send({
        locals
    });

});


module.exports = { getAllLocals, getLocal, deleteLocal, modifyLocal, createLocal, getLocalReviews, getFiltredLocals };



