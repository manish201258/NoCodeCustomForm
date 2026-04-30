const mongoose = require('mongoose');
require('dotenv').config();

const URI = process.env.MONGO_URI;

const connectDB = async () => {

    try {
        await mongoose.connect(URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

module.exports = connectDB;