const planCTRL = {};

const Plan = require('../models/Plan');
const { validatePlan, validarPartialPlan } = require('./schemas/planSchema');


planCTRL.postPlan = async (req, res) => {

    const result = await validatePlan(req.body);

    if(!result.success) return res.status(500).json({
        ok: false,
        msg: JSON.parse(result.error)
    });

    try {

        const plan = new Plan(result.data);

        await plan.save();

        res.status(201).json({
            ok: true,
            plan
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

};

planCTRL.actualizar = async (req, res) => {
    const { id } = req.params;

    const result = await validarPartialPlan(req.body);

    if(!result.success) return res.status(400).json({
        ok: false,
        msg: JSON.parse(result.error)
    })

    try {
        const updateData = result.data;
        
        const updatePlan = await Plan.findOneAndUpdate({_id: id}, updateData, { new: true });

        if (!updatePlan) return res.status(400).json({
            ok: false,
            msg: 'No existe el Plan'
        })

        res.status(200).json({
            ok: true,
            updatePlan
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }

};

planCTRL.getAll = async (req, res) => {
    try {
        const planes = await Plan.find();

        res.status(200).json({
            ok: true,
            planes
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

planCTRL.getPlanForName = (req, res) => {

    const { name } = req.params

    try {

        const plan = Plan.findOne(name);

        res.status(200).send({
            ok: true,
            plan
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

};

module.exports = planCTRL;