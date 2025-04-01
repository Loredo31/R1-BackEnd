const Carrera = require('../models/Carrera');

exports.getCarreras = async (req, res) => {
  try {
    const carreras = await Carrera.find();
    res.status(200).json(carreras);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las carreras', error });
  }
};
