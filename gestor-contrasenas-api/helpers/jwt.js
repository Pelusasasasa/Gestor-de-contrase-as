const jtw = require('jsonwebtoken');
require('dotenv').config();

const JWT = process.env.JWT;


const generarJTW = (uid, password) => {
    return new Promise((resolve, reject) => {

        const payload = { uid, password };

        jtw.sign(payload, JWT, {
            expiresIn: '12h'
        }, (error, token) => {
            if (error) {
                console.log(error);
                reject('No se pudo generar el token');
            }
            resolve(token);
        })
    });
}

module.exports = {
    generarJTW
}