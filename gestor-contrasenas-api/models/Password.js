const { Schema, model } = require('mongoose');

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
    }
})


module.exports = model('Password', Password);