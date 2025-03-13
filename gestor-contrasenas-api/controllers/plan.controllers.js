const planCTRL = {};

const Plan = require('../models/Plan');


planCTRL.postPlan = async (req, res) => {

    const { name, price, features } = req.body;

    try {

        const plan = new Plan({
            name, price, features
        });

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

    const { name, price, feactures } = req.body;

    try {
        const updateData = {}

        if (name !== undefined) updateData.$set.name = name;
        if (price !== undefined) updateData.$set.price = price;
        if (features !== undefined) updateData.$set.features = features;

        const updatePlan = await Plan.findOneAndUpdate(id, updateData, { new: true });

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