const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {

        const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/password-manager';
        mongoose.connect(mongoURI);
        console.log("Base de datos conectada")
    } catch (error) {
        console.log(error);
        process.exit(1);
    };
}

module.exports = connectDB;