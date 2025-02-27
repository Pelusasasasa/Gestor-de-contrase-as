const { Router } = require('express');
const router = Router();

const { postOne, getAll, putOne, deleteOne } = require('../controllers/password.controllers');
const { validarJWT } = require('../middlewares/validar-jwt');

router.use(validarJWT);

router.route('/')
    .post(postOne)
    .get(getAll)
router.route('/:id')
    .put(putOne)
    .delete(deleteOne)

module.exports = router