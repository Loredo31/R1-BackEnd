const mongoose = require('mongoose');

const solicitudSchema = new mongoose.Schema({
    nombreEmpresa: { type: String, required: true },
    numeroFolio: { type: String, required: true, unique: true },
    estatus: { type: String, enum: ["Pendiente", "Aprobada", "Rechazada"], default: "Pendiente" },
    carrera: { type: String, required: true },
    puesto: { type: String, required: true },
    experiencia: { type: String },
    conocimientos: { type: String },
    cantidad: { type: Number, required: true },
    fechaSolicitud: { type: Date, default: Date.now },
    fechaInicio: { type: Date, required: true },
    fechaFin: { type: Date, required: true },
    apoyoEconomico: { type: Number, default: 0 },
    aprendizaje: { type: String },
    modalidad: { type: String, enum: ["Presencial", "Remota", "Híbrida"], required: true },
    descripciónTrabajo: { type: String, required: true }
});

module.exports = mongoose.model('Solicitude', solicitudSchema);
