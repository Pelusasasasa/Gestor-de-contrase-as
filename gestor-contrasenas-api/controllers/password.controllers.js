const passwordCTRL = {};

const { default: mongoose } = require('mongoose');
const Password = require('../models/Password');

passwordCTRL.postOne = async(req, res) => {

    try {
        
        const uid = req.uid;

        if(!uid){
            return res.status(400).json({
                msg: 'Usuario no existe',
                ok: false
            })
        };

        req.body.user = uid;

        const newPassword = new Password(req.body);

        await newPassword.save();

        res.status(201).json({
            newPassword,
            ok: true
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
            ok: false
        })
    }

};

passwordCTRL.getAll = async(req, res) => {

    const uid = req.uid;

    try {
        
        if(!uid){
            return res.status(400).json({
                msg: 'Usuario no existe',
                ok: false
            });
        }

        const password = await Password.find({user: uid});

        res.status(200).json({
            password,
            ok: true
        });
        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
            ok: false
        })
    }

};

passwordCTRL.putOne = async(req, res) => {
    const { id } = req.params;

    const uid = req.uid;

    try {
        
        if(!uid){
            return res.status(400).json({
                msg: 'Usuario no existe',
                ok: false
            })
        };

        const password = await Password.findById(id);

        if(!password){
            return res.status(400).json({
                msg: 'Contraseña no existe',
                ok: false
            });
        };

        if(password.user.toString() !== uid){
            return res.status(401).json({
                msg: 'No tienes permisos para editar esta contraseña',
                ok: false
            });
        }

        const updatePassword = await Password.findByIdAndUpdate(id, req.body, {new: true});

        res.status(200).json({
            updatePassword,
            ok: true
        })

    } catch (error) {
        console.log(error);
        res.status.json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
};

passwordCTRL.deleteOne = async(req, res) => {

    const { id } = req.params;
    const uid = req.uid;
    try {
        
        if(!uid){
            return res.status(400).json({
                msg: 'Usuario no existe',
                ok: false
            })
        };

        const password = await Password.findById(id);

        if(!password){
            return res.status(400).json({
                msg: 'Contraseña no existe',
                ok: false
            });
        };

        if(password.user.toString() !== uid){
            return res.status(401).json({
                msg: 'No tienes permisos para eliminar esta contraseña',
                ok: false
            });
        };

        const deletePassword = await Password.findByIdAndDelete(id);

        res.status(200).json({
            deletePassword,
            ok: true
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
            ok: false
        })
    }

};

passwordCTRL.deleteForUserId = async(req, res) => {

    
    const uid = req.uid;

    try {

        console.log("ACA Estamos")
        //Convetir el uid en un Object Id
        const userId = new mongoose.Types.ObjectId(uid);

        const resultado = await Password.deleteMany({
            user: userId
        });

        //Verificar que se eliminaro
        if(resultado.deletedCount === 0){
            return res.status(400).json({
                ok: false,
                msg: 'No se pudieron borrar los passwords'
            })
        };

        res.status(200).json({
            ok: true,
            msg:'Se eliminaros las contraseñas',
            resultado
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }

};


module.exports = passwordCTRL;