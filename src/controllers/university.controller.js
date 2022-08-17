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
   if (!mongoose.isValidObjectId(id))
   {
       return next(new ErrorResponse("id not valid", 403));
   }
     const university = await University.findById(id);

    res.status(200).send({
        "success": true,
        university
    });
});


const deleteUniversity = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        return next(new ErrorResponse("id not valid", 403));
    }
    const university = await University.findByIdAndDelete(id);

    res.status(200).send({
        "success": true,
        university
    });
});


const modifyUniversity = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return next(new ErrorResponse("id not valid", 403));
    }
    const university = await University.findById(id);

    res.status(200).send({
        "success": true,
        university
    });
});



module.exports = { getAllUniversities, getUniversity, deleteUniversity };


