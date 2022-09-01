const mongoose = require("mongoose");
require('dotenv').config({ path: __dirname + "../../.env" });

const connectDB = async () => {
    const cnn = await mongoose.connect(
        process.env.MONGOO_DB_URL,
        (err) => {
            if (err) console.error(err);
            else console.log(`MongoDB Connected  ... `);
        }
    );

};


module.exports =  connectDB;