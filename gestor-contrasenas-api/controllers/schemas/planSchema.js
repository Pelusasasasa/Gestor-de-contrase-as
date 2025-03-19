const z = require('zod');
const Plan = require('../../models/Plan');

const planSchema = z.object({
    name: z.string(
        {
            invalid_type_error: 'El nombre debe ser un string',
            required_error: 'El nombre es obligatorio'
        }
    ).refine(async(nombre) => {
        const plan = await Plan.findOne({name: nombre});
        console.log(plan)
        return plan === null;
    },{
        message: 'Ya existe plan con ese nombre'
    }),
    price: z.number({
        invalid_type_error: 'El Precio Debe de ser Un numero'
    }).min(0),
    features: z.array( z.string())
});

async function validatePlan (input) {
    return await planSchema.safeParseAsync(input)
};


async function validarPartialPlan(input) {
    return await planSchema.partial().safeParseAsync(input)
};

module.exports = {
    validatePlan,
    validarPartialPlan
};