const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const Password = new Schema({
    title:{ 
        type: String,
        default: ''
    },
    username:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    desc: {
        type: String,
        default: ''
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