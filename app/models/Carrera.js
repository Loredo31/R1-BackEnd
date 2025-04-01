const mongoose = require('mongoose');

// Esquema de Carrera
const CarreraSchema = new mongoose.Schema({
  area: { type: String, required: true }, // Área de la carrera (Ejemplo: "Área Económico Administrativo")
  carreras: [{ type: String, required: true }] // Lista de carreras asociadas a un área
});

module.exports = mongoose.model('Carrera', CarreraSchema);



