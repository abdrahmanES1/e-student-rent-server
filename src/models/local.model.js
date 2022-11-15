const mongoose = require("mongoose");
const { Schema } = mongoose;


const LocalSchema = new Schema({
    // _id: Schema.Types.ObjectId,
    title: { type: String, required: [true, 'please add a title'] },
    description: { type: String, required: [true, 'please add a description'] },
    adresse: { type: String, required: [true, 'please add a adresse'] },
    price: { type: Number, required: [true, 'please add a price'] },
    nbrRooms: { type: Number, required: [true, 'please add a room\'s Number'] },
    area: { type: Number, required: [true, 'please add a area'] },
    images: [{ type: String, minlength: [1, 'local should have at least one image'] }],
    localisation: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, required: [true, 'Please Select a User'] },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    universities: [{ type: Schema.Types.ObjectId, ref: 'University' }],

}, { timestamps: true })


const LocalModel = mongoose.model("Local", LocalSchema);

module.exports = LocalModel;
