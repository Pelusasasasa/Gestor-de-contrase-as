const jtw = require('jsonwebtoken');
require('dotenv').config();

const JWT = process.env.JWT;

//Funcion que crea un Json Web token para la autenticacion del usuario que luego va a servir para llamar a las  contraseñas si es que esta autenticado
const generarJTW = (uid, password) => {
    return new Promise((resolve, reject) => {

        const payload = { uid, password };

        jtw.sign(payload, JWT, {
            expiresIn: '1h'
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