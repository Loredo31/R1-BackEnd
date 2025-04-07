const mongoose = require('mongoose');

const ServiciosEscolaresSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    puesto: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    rol: { type: Number, default: 2 },
    telefono: { type: String, required: true },
    extension: { type: String, required: true },
    contrasenia: { type: String, required: true },
    universidad: { type: String, required: true },
    departamento: { type: String, required: true },
    funciones: [{ type: String }]
});

module.exports = mongoose.model('ServiciosEscolare', ServiciosEscolaresSchema);
