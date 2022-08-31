const asyncHandler = require('../middlewares/async');
const sendEmail = require('../utils/mailer');
const ErrorResponse = require('../utils/errorResponse');

const postEmail = asyncHandler(async(req, res, next)=>{
    const {from, subject, text, to} = req.body;

    if (!(from && subject && text)){
        return next(new ErrorResponse('All Fields is required', 403))
    }

    try{
        await sendEmail(from, to, subject, text);
        
    }catch(err){
        return next(new ErrorResponse(err, 403));
    }

    res.status(200).send({
        "success": true,
        "message": "email sent successfully"
    })
})

module.exports = postEmail;