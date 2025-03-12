const mongoose = require('mongoose');
require('dotenv').config();

//Funcion que logra conectar la base de datos de mongo db, si tenemos una conexion en las variables de entorno utiliza esa conexion,
//  sino lo hace de forma local en nuestro mongo db para desarrolo
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