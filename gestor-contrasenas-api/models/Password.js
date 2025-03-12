const { Schema, model } = require('mongoose');

// Modelo: Password
// Descripcion: Representa las contraseñas del Usuario
// Campos: 
//     -Title: Un titulo para saber a que cuenta pertenece(texto)
//     -username: Nombre de usuario de la cuenta para ingresar(texto)
//     -password: Contraseña de la cuenta(texto)
//     -user: Usuario al que pertenece esta contraseña(User)
//     -descripcion: breve descripcion opcional para ayudar al usuario a identificar la cuenta

const Password = new Schema({
    title: {
        type: String,
        default: '',
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    descripcion: {
        type: String,
        default: '',
        trim: true
    }
});

module.exports = model('Password', Password);