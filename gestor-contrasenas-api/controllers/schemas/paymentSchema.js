const z = require('zod');
const User = require('../../models/User');
const Plan = require('../../models/Plan');
const { default: mongoose } = require('mongoose');

const paymentSchema = z.object({
    userId: z.string().refine(async (id) => {
        const user = await User.findById(new mongoose.Types.ObjectId(id));
        return user !== null;
    }, {
        message: 'El ID del usuario no es valido o no existe'
    }),
    planId: z.string().refine(async (id) => {
        const plan = await Plan.findById(new mongoose.Types.ObjectId(id))
        return plan !== null;
    }, {
        message: 'El Id del Plan no es valido o no existe'
    }),
    amount: z.number().min(0),
    paymentDate: z.number(),
    nextPaymentDate: z.number(),
    status: z.string(
        z.enum(['Active', 'Inactive', 'Pending'])
    )
})

async function validatePayment(input) {
    return await paymentSchema.safeParseAsync(input);
};


module.exports = {
    validatePayment
}