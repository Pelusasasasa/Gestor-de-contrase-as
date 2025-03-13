const { Router } = require('express');
const { postPayment } = require('../controllers/payment.controllers');
const router = Router();

router.route('/')
    .post(postPayment)

module.exports = router;