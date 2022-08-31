const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const ErrorResponse = require('./errorResponse');
require('dotenv').config({path : __dirname + "../../.env"})
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_USERNAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

/**
 * 
 * @param {*} files 
 * @returns 
 */

exports.uploadImage = async files => {
    let results = [];

    if (!files) {
        results = false;
    }

    const images = files.images
        ? files.images.length && files.images.length > 0
            ? files.images
            : [files.images]
        : [files.image];

    if (images) {
        for (let i = 0; i < images.length; i++) {
            const image = images[i];

            image.mv(__dirname + `/data/uploads/${image.name}`, error => {
                if (error) {
                    return new ErrorResponse(error.message, 500);
                }
            })

            const res = await cloudinary.uploader.upload(
                __dirname + `/data/uploads/${image.name}`
            );

            results.push(res.secure_url);

            fs.unlink(__dirname +`/data/uploads/${image.name}`, err => {
                if (err) throw err;
            });
        }
    }

    return results;
};

/**
 * 
 * @param {string[]} urls 
 * @returns length of deleted images
 */
exports.deleteImage = async urls => {
    public_ids = [];
    urls.forEach(url => {
        public_ids.push(
            url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.'))
        );
    });
    const res = await cloudinary.api.delete_resources(public_ids);
    return Object.keys(res.deleted).length;
};