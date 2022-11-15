const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config({ path: __dirname + '../../.env' });

const UserSchema = new Schema({
    // _id: Schema.Types.ObjectId,
    username: { type: String, required: [true, 'Please add a name'] },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password longer than 6 characters'],
        minlength: 6,
        select: false
    },
    role: {
        type: String,
        enum: ['student', 'landlord','admin', 'superadmin'],
        default: 'student'
    },
    blocked: {
        type: Boolean,  enum: [true, false],
        default: false
},
    phone: { type: Number },
    adresse: { type: String },
    avatar: { type: String },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    locals: [{ type: Schema.Types.ObjectId, ref: 'Local' }],

}, { timestamps: true });

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.JWT_EXPIRE * process.env.JWT_EXPIRE
    });
};

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
