const express = require('express');
const router = express.Router();
const Profesor = require('../models/Profesor');

// Ruta para obtener todos los profesores
router.get('/', async (req, res) => {
  try {
    const profesores = await Profesor.find();
    res.json(profesores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para obtener un profesor por ID
router.get('/:id', async (req, res) => {
  try {
    const profesor = await Profesor.findOne({ professorId: req.params.id });
    if (!profesor) {
      return res.status(404).json({ message: 'Profesor no encontrado' });
    }
    res.json(profesor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
