const { Schema, model } = require('mongoose');

/**
 * Modelo: Plan
 * Descripcion: Rep´resenta el plan que puede tener un usuario
 * Campos:
 *  -name: Nombre del plan(Texto) Unico
 *  -price: Precio del plan
 *  -features: Caracteristicas de los planes
 */

const Plan = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    features: [{
        type: String
    }]
});

module.exports = Model('Plan', Plan);