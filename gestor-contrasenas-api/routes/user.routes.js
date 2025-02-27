const { Router } = require('express');
const { crearUsuario, login, updateUser } = require('../controllers/user.controllers');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.route('/new')
    .post(crearUsuario)
router.route('/login')
    .post(login)
router.route('/update')
    .put(validarJWT, updateUser)



module.exports = router;