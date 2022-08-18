const { default: mongoose } = require('mongoose');
const asyncHandler = require('../middlewares/async');
const University = require('../models/university.model');
const ErrorResponse = require('../utils/errorResponse');

const getAllUniversities = asyncHandler(async (req, res, next) => {
    const universities = await University.find();

    res.status(200).send({
        "success": true,
        universities
    });

})

const getUniversity = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return next(new ErrorResponse("id not valid", 403));
    }

    const university = await University.findById(id);

    if (!university) { return next(new ErrorResponse('University Does Not Exist', 403)) }

    res.status(200).send({
        "success": true,
        university
    });
});


const deleteUniversity = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        return next(new ErrorResponse("University id not valid", 403));
    }

    const university = await University.deleteOne({ _id: id });

    if (university.deletedCount == 0) {
        return next(new ErrorResponse("University  not found", 403))
    }

    return res.status(200).send({
        "success": true,
        university
    });

});


const modifyUniversity = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { city, name } = req.body;

    if (!mongoose.isValidObjectId(id)) {
        return next(new ErrorResponse("University id not valid", 403));
    }

    const university = await University.findByIdAndUpdate(id, { city, name });

    if (!university) { return next(new ErrorResponse("University not found", 403)) }

    return res.status(200).send({
        "success": true,
        university
    });
});


const createUniversity = asyncHandler(async (req, res, next) => {
    const { city, name, localisation } = req.body;

    if (!(name && city)) {
        return next(new ErrorResponse('All Fields is Required', 403))
    }

    const existUniversity = await University.findOne({name});
    console.log(existUniversity)
    if (existUniversity) { return next(new ErrorResponse('This University Name Already Exist', 403)) }

    const university = await University.create({
        name, city, localisation
    })

    res.status(200).send({
        "success": true,
        university
    })

})



module.exports = { getAllUniversities, getUniversity, deleteUniversity, modifyUniversity, createUniversity };


