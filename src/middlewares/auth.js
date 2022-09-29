const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/user.model');
const asyncHandler = require('./async');
require('dotenv').config({ path: __dirname + '../../.env' });

const enableProtection = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) { return next(new ErrorResponse("Not authorized to access this route and token not exist", 401)) }
    
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

/**
 * 
 * @param  {...String} roles 
 */

const authorize = (...roles) => {
   return async (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorResponse(`${req.user.role} role is not authorized to access this route`, 403))
        }
        next();
    }
}

module.exports = { enableProtection, authorize }