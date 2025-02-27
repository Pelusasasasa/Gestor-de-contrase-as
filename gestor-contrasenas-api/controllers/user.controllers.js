const userCTRL = {};
const bcrypt = require('bcrypt');

const User = require('../models/User');
const { generarJTW } = require('../helpers/jwt');

userCTRL.crearUsuario = async(req, res) => {

    console.log(req.body)

    const {username, password} = req.body;

    try {
        const  user = await User.findOne({username});

        if( user ){
            return res.status(400).json({
                ok: false,
                message: 'Ya existe usario con ese nombre'
            });
        };

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
        res.status(500).json({msg: 'Hable con el administrador'});
    }

};

userCTRL.login = async(req, res) => {

    const {username, password} = req.body;

    try {

        const user = await User.findOne({username});

        if (!user){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        };

        //Si existe el usuario entonces usamos el metodo para ver si las contraseñas son iguales
        if(user){
            const isMatch = await user.comparePassword(password);
            //Si las contraseñas no sol iguales retornamos un mensaje
            if(!isMatch){
                return res.status(400).json({
                    msg: 'Contraseña Incorrecta',
                    ok: false
                })
            }else{
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

userCTRL.updateUser = async(req, res) => {
    const { id } = req.params;
    const uid = req.uid;
    const password = req.password;

    try {
        
        const user = await User.findOne({_id: uid});

        if(!user){
            return res.status(400).json({
                msg: 'Usuario no existe',
                ok: false
            })
        };

        const updateUser = await User.findOneAndUpdate({_id: uid}, req.body, {new: true});

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

module.exports = userCTRL;