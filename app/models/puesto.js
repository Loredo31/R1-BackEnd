const mongoose = require('mongoose');

const puestoSchema = new mongoose.Schema({
  nombrepuesto: String
});

module.exports = mongoose.model('puesto', puestoSchema);
