const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../')
require('dotenv').config({path:__dirname + '../../.env'});

const protected = (req, res, next) => {
    const token  = req.header('x-auth-token');

    if (!token) { return next(new ErrorResponse("Not authorized to access this route", 401))}

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
    



}


const authorize = (...roles) => {
    async (req, res, next) =>{
        if(roles.includes(req.user.role)){
            return next(new ErrorResponse(`${req.user.role} role is not authorized to access this route`, 403))
        }

        next();
    }
}