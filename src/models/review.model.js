const mongoose = require("mongoose");
const { Schema } = mongoose;


const ReviewSchema = new Schema({
    // _id: Schema.Types.ObjectId,
    description: { type: String, required: true },
    rating: { type: Number, required: true },
    local: { type: Schema.Types.ObjectId, ref: 'Local' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true })


const ReviewModel = mongoose.model("Review", ReviewSchema);
module.exports =  ReviewModel;
