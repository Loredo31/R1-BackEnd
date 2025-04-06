const mongoose = require('mongoose');

const solicitudSchema = new mongoose.Schema({
    numeroFolio: { type: String, required: true, unique: true},
    nombreEmpresa: { type: String, required: true },
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
    descripcionTrabajo: { type: String, required: true }
});

// Middleware para generar automáticamente el número de folio
solicitudSchema.pre('validate', async function(next) {
    if (this.isNew && !this.numeroFolio) {
        const empresaPrefix = this.nombreEmpresa.trim().toUpperCase().substring(0, 3);

        // Contar solicitudes existentes con el mismo prefijo
        const regex = new RegExp(`^${empresaPrefix}-\\d{3}$`);
        const count = await mongoose.model('Solicitude').countDocuments({ numeroFolio: { $regex: regex } });

        const nextNumber = (count + 1).toString().padStart(3, '0');
        this.numeroFolio = `${empresaPrefix}-${nextNumber}`;
    }

    next();
});

module.exports = mongoose.model('Solicitude', solicitudSchema);
