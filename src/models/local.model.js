const mongoose = require("mongoose");
const { Schema } = mongoose;

const LocalSchema = new Schema({
    // _id: Schema.Types.ObjectId,
    title: { type: String, required: true },
    description: { type: String, required: true },
    adresse: { type: String, required: true },
    price: { type: Number, required: true },
    nbrRooms: { type: Number, required: true },
    mainImage: { type: String, required: true },
    images: [{ type: String }],
    localisation: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    universities: [{ type: Schema.Types.ObjectId, ref: 'University' }],

}, { timestamps: true })


const LocalModel = mongoose.model("Local", LocalSchema);

module.exports = LocalModel;
