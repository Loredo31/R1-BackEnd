const express = require('express');
const router = express.Router();
const carrera = require('../models/carrera');
const puesto = require('../models/puesto');

router.get('/carreras', async (req, res) => {
  const carreras = await carrera.find();
  res.json(carreras);
});

router.get('/puestos', async (req, res) => {
  const puestos = await puesto.find();
  res.json(puestos);
});

module.exports = router;
