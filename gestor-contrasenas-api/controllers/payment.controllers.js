const { validatePayment } = require("./schemas/paymentSchema");

const paymentCTRL = {};

const Payment = require('../models/Payment');

paymentCTRL.postPayment = async (req, res) => {
    const result = await validatePayment(req.body);

    if (!result.success) return res.status(500).json({
        ok: false,
        msg: JSON.parse(result.error)
    });

    const payment = new Payment(result.data);

    await payment.save();

    res.status(201).json({
        ok: true,
        payment
    });

};

module.exports = paymentCTRL;