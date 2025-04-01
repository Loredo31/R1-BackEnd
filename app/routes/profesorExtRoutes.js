const express = require('express');
const { actualizarActividadAlumno } = require('../controllers/profesorExtController');
const router = express.Router();

// Ruta para actualizar los campos de la actividad de un alumno
router.put('/alumnos/actividad/:id', actualizarActividadAlumno);

module.exports = router;
