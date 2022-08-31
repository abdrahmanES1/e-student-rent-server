const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utils/errorResponse');
const { uploadImage, deleteImage } = require('../utils/fileUpload')

const uploadFile = asyncHandler(async(req, res, next)=>{
    const { files } = req;

    if (!files) {
        return next(new ErrorResponse('Provide One Image At Least', 403))
    }

    const images = await uploadImage(files);

    res.status(200).send({
        "success": true,
        images
    })
})


const deleteFile = asyncHandler(async (req, res, next) => {
    const { images } = req.body;

    if (!images) {
        return next(new ErrorResponse('Provide One Image At Least', 403))
    }

    try{
        await deleteImage(images);
    }catch(err){
        return next(new ErrorResponse(err, 403))
    }


    res.status(200).send({
        "success": true
    })
})

module.exports = { uploadFile, deleteFile }