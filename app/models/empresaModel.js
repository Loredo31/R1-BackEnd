const mongoose = require('mongoose');

const EmpresaSchema = new mongoose.Schema({
    nombreEmpresa: { type: String, required: true },
    giro: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    telefono: { type: String, required: true },
    rol: { type: Number, default: 1 },
    direccion: {
        calle: { type: String, required: true },
        numero: { type: String, required: true },
        colonia: { type: String, required: true },
        ciudad: { type: String, required: true }
    },
    contrasenia: { type: String, required: true } // Campo de contraseña
});


module.exports = mongoose.model('Empresa', EmpresaSchema);