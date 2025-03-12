const JWT = process.env.JWT

//Funcion que valida el JSon Web Token de un usuario si es que esta logueado para luego entrar a las rutas de la api de las contraseñas.
//En el caso de que el JSONWebToken haya expirado retorna un error, sino deja continuar a las llamadas de la api
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
        
        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en validar token, hable con el administrador',
            ok: false
        })
    };
    
};

module.exports = {
    validarJWT
}