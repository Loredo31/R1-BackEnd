const mongoose = require('mongoose');

const carreraSchema = new mongoose.Schema({
  nombreCarrera: String
});

module.exports = mongoose.model('carrera', carreraSchema);
