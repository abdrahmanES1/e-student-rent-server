const mongoose = require("mongoose");
const { Schema } = mongoose;


const ReviewSchema = new Schema({
    description: { type: String, required: [true, "please add a description"] },
    rating: { type: Number, required: [true, "please add a rating"] },
    local: { type: Schema.Types.ObjectId, ref: 'Local' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true })


const ReviewModel = mongoose.model("Review", ReviewSchema);
module.exports = ReviewModel;
