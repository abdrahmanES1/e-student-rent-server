const { default: mongoose } = require('mongoose');
const asyncHandler = require('../middlewares/async');
const User = require('../models/user.model');
const ErrorResponse = require('../utils/errorResponse');
const bcrypt = require('bcrypt');

const getAllUsers = asyncHandler(async (req, res, next) => {
    const { populate, min ,max } = req.query;
    const users = await User.find().populate(populate).skip(min).limit(max);

    res.status(200).send({
        "success": true,
        users
    });
})

const getUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { populate } = req.query;

    if (!mongoose.isValidObjectId(id)) {
        return next(new ErrorResponse("id not valid", 403));
    }
    const user = await User.findById(id).populate(populate);

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
        "success": true
    });

});

const modifyUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { user } = req.body;

    if (!mongoose.isValidObjectId(id)) {
        return next(new ErrorResponse("User id not valid", 403));
    }
    if (!user) {
        return next(new ErrorResponse("define the fields that you want to update", 403));
    }
    if(user.password){
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }

    const existUser = await User.findByIdAndUpdate(id, { ...user });

    if (!existUser) {
        return next(new ErrorResponse("User not Exist", 403));
    }

    return res.status(200).send({
        "success": true,
        user: existUser
    });
});

// TODO:
// get user reviews

module.exports = { getAllUsers, getUser, deleteUser, modifyUser };