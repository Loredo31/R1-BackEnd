const express = require('express');
const router = express.Router();
const Carrera = require('../models/Carrera');
const { getCarreras } = require('../controllers/carreraCotroller');

// Ruta para obtener todas las carreras
router.get('/', async (req, res) => {
  try {
    const carreras = await Carrera.find();
    res.json(carreras);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/carreras', getCarreras);

module.exports = router;
