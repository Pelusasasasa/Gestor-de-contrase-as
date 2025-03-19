const userCTRL = {};
const bcrypt = require('bcrypt');

const User = require('../models/User');
const { generarJTW } = require('../helpers/jwt');

userCTRL.crearUsuario = async (req, res) => {

    console.log(req.body)

    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe usario con ese email'
            });
        };

        user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe usuario con ese nombre'
            })
        }

        const newUser = new User(req.body);
        await newUser.save();

        const token = await generarJTW(newUser._id, newUser.password);

        res.status(201).json({
            ok: true,
            msg: 'Usuario creado con exito',
            user: newUser,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
            ok: false
        });
    }

};

/**
 * Ruta: POST /gestor/users/delete
 * Descripcion: Elimina el Usuario si es que esta legueado, osea el JWT No esta Expirado
 * Parametros de entrada: 
 *  -username: Nombre del usuario
 * Respuesta: 
 *  -200: Usuario Eliminado
 *  -400: No existe el usuario
 *  -500: Error del servidor 
 */
userCTRL.deteleUser = async (req, res) => {

    try {

        const uid = req.uid;
        console.log('El uid es: ', uid)
        console.log(req.body)
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            return res.status(400).json({
                msg: 'Usuario no existe',
                ok: false
            });
        };

        const deleteUser = await User.findOneAndDelete({ _id: uid });

        res.status(200).json({
            ok: true,
            user: deleteUser
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

};

/**
 * Ruta: POST /gestor/users/login
 * Descripcion: Permite al Usuario Logearse
 * Parametros de entrada: 
 *  -username: Nombre de Usuario
 *  -password: Contraseña del Usuario
 * Respuesta: 
 *  -200: Inicio de sesion Exitoso
 *  -400: No existe el usuario
 *  -400: Contraseña Incorrecta
 *  -500: Error del servidor 
 */
userCTRL.login = async (req, res) => {

    const { username, password } = req.body;

    try {

        const user = await User.findOne({
            $or: [
                { username },
                { email: username }
            ]
        });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        };

        //Si existe el usuario entonces usamos el metodo para ver si las contraseñas son iguales
        if (user) {
            const isMatch = await user.comparePassword(password);
            //Si las contraseñas no sol iguales retornamos un mensaje
            if (!isMatch) {
                return res.status(400).json({
                    msg: 'Contraseña Incorrecta',
                    ok: false
                })
            } else {
                const token = await generarJTW(user._id, user.password);

                res.status(200).json({
                    user,
                    ok: true,
                    token
                })
            }
        };

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable co el administrador',
            ok: false
        })
    }

};

userCTRL.updateUser = async (req, res) => {
    const uid = req.uid;

    try {

        const user = await User.findOne({ _id: uid });

        if (!user) {
            return res.status(400).json({
                msg: 'Usuario no existe',
                ok: false
            })
        };

        const updateUser = await User.findOneAndUpdate({ _id: uid }, req.body, { new: true });

        const token = await generarJTW(uid, updateUser.password);

        res.status(200).json({
            ok: true,
            user: updateUser,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador',
            ok: false
        })
    }




};

userCTRL.renew = async (req, res) => {
    const uid = req.uid;
    const password = req.password;
    console.log(uid)
    console.log("a");
    let { username } = await User.findOne({ _id: uid });

    const token = await generarJTW(uid, password);

    res.json({
        ok: true,
        token,
        user: {
            username
        }
    })
};
/**
 * Ruta: PUT /gestor/users/password
 * Descripcion: Permite cambiar la contraseña del usuari
 * Parametros de entrada:
 *  -password: Contraseña Actual
 *  -newPassword: Nueva Contraseña
 * Respuesta:
 *  -200: Se cambio la Contraseña
 *  -400: Contraseña Incorrecta
 *  -400: No existe JWT
 *  -500: Error del servidor
 */
userCTRL.updatePassword = async (req, res) => {

    const { password, newPassword } = req.body;
    const uid = req.uid;

    try {
        const user = await User.findOne({ _id: uid });

        const isMatch = await user.comparePassword(password);

        if (!isMatch) return res.status(400).json({
            ok: false,
            msg: 'Contraseña Incorrecta'
        });

        user.password = newPassword;
        await user.save();


        res.status(200).json({
            ok: true,
            user: {
                username: user.username
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

module.exports = userCTRL;