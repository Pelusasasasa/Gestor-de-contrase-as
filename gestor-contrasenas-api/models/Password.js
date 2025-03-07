const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

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


// Password.pre('save', function(next){

//     if(this.isModified('password')){
//         this.password = bcrypt.hashSync(this.password, 10);
//     };
//     next();
// });

// Password.pre('findOneAndUpdate', function(next){
//     const update = this.getUpdate();

//     if(update.password){
//         update.password = bcrypt.hashSync(update.password, 10);
//     };

//     next();
// })


module.exports = model('Password', Password);