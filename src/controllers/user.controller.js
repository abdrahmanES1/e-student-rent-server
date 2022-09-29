const { default: mongoose } = require('mongoose');
const asyncHandler = require('../middlewares/async');
const User = require('../models/user.model');
const Local = require('../models/local.model');
const ErrorResponse = require('../utils/errorResponse');
const bcrypt = require('bcrypt');
require('dotenv').config({ path: __dirname + "/../../.env" });


const getAllUsers = asyncHandler(async (req, res, next) => {
    const { populate, min ,max } = req.query;
    const users = await User.find({role: "user"}).populate(populate).skip(min).limit(max);

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
    
    if (!user) { return next(new ErrorResponse('User Does Not Exist', 403)) }
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
        user.password = await bcrypt.hash(user.password, Number(process.env.BCRYPT_SALT));
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


const getUserLocals = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { populate, min, max } = req.query;
    const locals = await Local.find({user: id}).populate(populate).skip(min).limit(max);

    res.status(200).send({
        "success": true,
        locals
    });
})

module.exports = { getAllUsers, getUser, deleteUser, modifyUser, getUserLocals };