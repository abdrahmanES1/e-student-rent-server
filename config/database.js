const mongoose = require("mongoose");
require('dotenv').config({ path: __dirname + "../../.env" });

const connectDB = async (fn) => {
    await mongoose.connect(process.env.MONGOO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => { console.log(`MongoDB Connected  ...`); fn() })
        .catch((err) => {
            console.error(err);
        })
};




module.exports = connectDB;