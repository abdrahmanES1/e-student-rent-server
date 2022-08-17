const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/user.model');
const asyncHandler = require('./async');
require('dotenv').config({ path: __dirname + '../../.env' });

const protected = asyncHandler(async (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) { return next(new ErrorResponse("Not authorized to access this route and token not exist", 401)) }
    
    console.log(token)
    try {
        const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
        const user = await User.findById(decoded.id);
    
        if(user){
            req.user = user;
        }

    } catch (error) {
        return next(new ErrorResponse("Not authorized to access this route", 401))
    }

    next();
})


const authorize = (...roles) => {
    async (req, res, next) => {
        if (roles.includes(req.user.role)) {
            return next(new ErrorResponse(`${req.user.role} role is not authorized to access this route`, 403))
        }

        next();
    }
}
module.exports = { protected, authorize }