const { Schema, model } = require('mongoose');



const Payment = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    planId: {
        type: Schema.Types.ObjectId,
        ref: 'Plan',
        required: true
    },
    amount: {
        Type: Number,
        required: true
    },
    paymentDate: {
        type: Date,
        default: Date.now
    },
    nextPaymentDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'pending'],
        default: 'pending'
    }
});


module.exports = model('Payment', Payment);