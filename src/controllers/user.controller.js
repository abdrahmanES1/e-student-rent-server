const { default: mongoose } = require('mongoose');
const asyncHandler = require('../middlewares/async');
const User = require('../models/user.model');
const ErrorResponse = require('../utils/errorResponse');

const getAllUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find();

    res.status(200).send({
        "success": true,
        users
    });
})

const getUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return next(new ErrorResponse("id not valid", 403));
    }
    const user = await User.findById(id);

    res.status(200).send({
        "success": true,
        user
    });
});

const deleteUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        return next(new ErrorResponse("User id not valid", 403));
    }

    const user = await User.deleteOne({ _id: id });
    if (user.deletedCount == 0) {
        return next(new ErrorResponse("User  not found", 403))
    }

    return res.status(200).send({
        "success": true,
        user
    });

});

const modifyUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { city, name } = req.body;

    if (!mongoose.isValidObjectId(id)) {
        return next(new ErrorResponse("User id not valid", 403));
    }

    const user = await User.findByIdAndUpdate(id, { city, name });

    return res.status(200).send({
        "success": true,
        user
    });
});

module.exports = { getAllUsers, getUser, deleteUser, modifyUser };