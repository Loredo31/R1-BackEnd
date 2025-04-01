const mongoose = require('mongoose');

// Esquema de Observación
const ObservacionSchema = new mongoose.Schema({
  teacherId: { type: String, required: true },  // ID del profesor que realiza la observación
  teacherName: { type: String, required: true },  // Nombre del profesor
  studentName: { type: String, required: true },  // Nombre del estudiante
  subject: { type: String, required: true },  // Nombre de la asignatura
  semester: { type: Number, required: true },  // Semestre (1 o 2)
  year: { type: Number, required: true },  // Año de la observación
  description: { type: String, required: true },  // Descripción de la observación
}, { timestamps: true }); // Agregar fechas de creación y modificación automáticamente

module.exports = mongoose.model('Observacion', ObservacionSchema);
