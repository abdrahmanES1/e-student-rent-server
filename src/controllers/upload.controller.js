const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utils/errorResponse');
const { uploadImage, deleteImage } = require('../utils/fileUpload')
const Local = require('../models/local.model')
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
    

    //delete image url from images array of a related local 

    const locals = await  Local.find({ images: { "$in": images } })

    locals.map(async(local) => {
        newImages = local.images.filter(img => {return !images.includes(img)});
       await Local.findOneAndUpdate({ _id: local._id},{images : newImages})
    })
    
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