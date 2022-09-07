const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utils/errorResponse');
const UserModel = require('../models/user.model');
const Token = require('../models/token.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { sendResetPasswordEmail, sendEmail } = require('../utils/mailer');

require('dotenv').config({ path: __dirname + "/../../.env" });

const register = asyncHandler(async (req, res, next) => {
    const { username, email, password, isStudent, role, adresse, phone } = req.body;
    if (!(username && email && password && isStudent !== undefined)) { return next(new ErrorResponse("All Fields is Required", 403)); }

    if (!isStudent && !(adresse && phone)) {
        return next(new ErrorResponse("Adresse and Phone Fields is Required  for Landlord", 403));
    }

    if (await UserModel.findOne({ email })) {
        return next(new ErrorResponse("Email Already Exist", 403));
    }
    const user = await UserModel.create({ username, email, password, isStudent, role })

    sendTokenResponse(user, 200, res);
})

const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorResponse('Please Provide an Email and Password', 400));
    }

    const user = await UserModel.findOne({ email }).select('+password');
    if (!user) {
        return next(new ErrorResponse('Email Does Not Exist Please Register First', 401));
    }
    if (user.blocked) {
        return next(new ErrorResponse('this user Blocked by an Admin ', 401));
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

const forgetPassword = asyncHandler(async (req, res, next) => {
    const { email } = req.body;
    const user = await UserModel.findOne({ email: email });

    if (!user) {
        return next(new ErrorResponse("Email Does Not Exist", 403));
    }
    let token = await Token.findOne({ userId: user._id });

    if (token) {
        await token.deleteOne();
    };

    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, Number(process.env.BCRYPT_SALT));


    await new Token({
        userId: user._id,
        token: hash,
        createdAt: Date.now(),
    }).save();

    const link = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}&id=${user._id}`;

    try {
        await sendResetPasswordEmail(user.email, link);
    } catch (error) {
        return next(new ErrorResponse(error, 403));
    }

    res.status(200).send({
        "success": true,
        "message": "Email Sent Successfully To " + user.email
    })

})

const resetPassword = asyncHandler(async (req, res, next) => {
    const { userId, token, password } = req.body;
    if (!(userId && token && password)) {
        return next(new ErrorResponse("All Fields is required", 401));
    }

    let passwordResetToken = await Token.findOne({ userId });
    if (!passwordResetToken) {
        return next(new ErrorResponse("Invalid or expired password reset token", 401))
    }
    const isValid = await bcrypt.compare(token, passwordResetToken.token);
    if (!isValid) {
        return next(new ErrorResponse("Invalid or expired password reset token", 401))
    }
    const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT));
    await UserModel.updateOne(
        { _id: userId },
        { $set: { password: hash } },
        { new: true }
    );
    const user = await UserModel.findById({ _id: userId });

    try {
        await sendEmail("E-Student Rent Paltform", user.email, "password Reseted successfully", "password Resetd successfully")
    } catch (error) {
        return next(new ErrorResponse(error, 403));
    }

    await passwordResetToken.deleteOne();

    res.status(200).send({
        "success": true,
        "message": "Your Password Reseted Successfully"
    })
})

module.exports = { register, login, getMe, forgetPassword, resetPassword };