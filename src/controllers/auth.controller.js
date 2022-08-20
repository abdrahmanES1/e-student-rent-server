const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utils/errorResponse');
const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');

const register = asyncHandler(async (req, res, next) => {
    const { username, email, password, isStudent } = req.body;
   
    if (!(username && email && password && isStudent))
        {return next(new ErrorResponse("all fields is required", 403));}

    if (await UserModel.findOne({email})){
        return next(new ErrorResponse("email Already exist", 403));
    }
    const user = await UserModel.create({ username, email, password, isStudent })

    sendTokenResponse(user, 200, res);
})

const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400));
    }

    const user = await UserModel.findOne({ email }).select('+password');
    if (!user) {
        return next(new ErrorResponse('email does not Exist please register first', 401));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return next(new ErrorResponse('Wrong email or password', 401));
    }

    sendTokenResponse(user, 200, res);
});

const getMe = asyncHandler(async (req, res, next) => {

    const user = await UserModel.findById(req.user.id);
    res.status(200).json({
        success: true,
        data: user,
    });
});

const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    
    res.status(statusCode).json({
        success: true,
        token,
    });
};

module.exports = { register, login, getMe }