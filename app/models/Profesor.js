const mongoose = require('mongoose');

// Esquema de Profesor
const ProfesorSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Nombre del profesor
  professorId: { type: String, required: true, unique: true }, // ID único del profesor
  specialty: { type: String, required: true }, // Especialidad del profesor (Carrera o área)
  courses: [{ type: String }], // Lista de cursos que imparte el profesor
  email: { type: String, required: true },
  phone: { type: String },
  startYear: { type: Number, required: true }, // Año en que comenzó a enseñar
});

module.exports = mongoose.model('Profesor', ProfesorSchema);
