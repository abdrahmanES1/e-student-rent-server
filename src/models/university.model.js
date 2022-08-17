const mongoose = require("mongoose");
const { Schema } = mongoose;


const UniversitySchema = new Schema({
    // _id: Schema.Types.ObjectId,
    name: { type: String, required: [true, 'please add a name of university'] },
    city: { type: String, required: [true, 'please add a city'] },
    localisation: {
        lat: Number,
        lng: Number
    },
    locals: [{ type: Schema.Types.ObjectId, ref: 'Local' }],
}, { timestamps: true })


const UniversityModel = mongoose.model("University", UniversitySchema);
module.exports = UniversityModel;
