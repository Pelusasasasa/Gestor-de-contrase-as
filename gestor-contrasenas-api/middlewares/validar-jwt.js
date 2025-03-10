const JWT = process.env.JWT

const validarJWT = (req, res, next) => {
    const jwt = require('jsonwebtoken');

    //x-token headers

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    };

    try {

        const { uid, password } = jwt.verify(
            token,
            JWT
        )
        req.uid = uid;
        req.password = password;


    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en validar token, hable con el administrador',
            ok: false
        })
    };
    next();
};

module.exports = {
    validarJWT
}