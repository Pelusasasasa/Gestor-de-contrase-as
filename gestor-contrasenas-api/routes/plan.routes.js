const { Router } = require('express');
const { getPlanForName, actualizar, postPlan, getAll } = require('../controllers/plan.controllers');

const router = Router();

router.route('/')
    .post(postPlan)
    .get(getAll)
router.route('/forName/:name')
    .get(getPlanForName)
router.route('/forId/:id')
    .patch(actualizar)

module.exports = router;