const mongoose = require("mongoose");
require('dotenv').config({ path: __dirname + "../../.env" });

const connectDB = async () => {
    const cnn = await mongoose.connect(
        "mongodb+srv://admin:ylPF6OjexStUKOoP@cluster0.loqnu.mongodb.net/eStudentRentDb?retryWrites=true&w=majority",
        (err) => {
            if (err) console.error(err);
            else console.log(`MongoDB Connected  ... `);
        }
    );

};


module.exports =  connectDB;