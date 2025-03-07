const bcrypt = require('bcrypt');
const { Schema, model } = require('mongoose');

const User = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
});


//Lo que hacemos es usar el metodo pre para que antes que se guade en la base de datos encripte la contraseña

User.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

User.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    if (update.password) {
        update.password = await bcrypt.hash(update.password, 10);
    };
    next();
});

//Ponemos un metodo para que comprare la contrase encriptada con la que se ingresa

User.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = model('User', User);