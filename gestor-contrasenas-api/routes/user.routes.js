const { Router } = require('express');
const { crearUsuario, login, updateUser, deteleUser, renew, updatePassword } = require('../controllers/user.controllers');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.route('/new')
    .post(crearUsuario)
router.route('/login')
    .post(login)
router.route('/renew')
    .post(validarJWT, renew)
router.route('/update')
    .put(validarJWT, updateUser)
router.route('/delete')
    .post(validarJWT, deteleUser)
router.route('/password')
    .put(validarJWT, updatePassword)


module.exports = router;