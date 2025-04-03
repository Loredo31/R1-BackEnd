// routes/serviciosEscolaresRoutes.js
const express = require('express');
const router = express.Router();
const serviciosEscolaresController = require('../controllers/serviciosEscolaresController');

// Crear un nuevo servicio escolar
router.post('/serviciosEscolares', serviciosEscolaresController.createServiciosEscolares);

// Obtener todos los servicios escolares
router.get('/serviciosEscolares', serviciosEscolaresController.getServiciosEscolares);

// Obtener un servicio escolar por ID
router.get('/serviciosEscolares/:id', serviciosEscolaresController.getServicioEscolarById);

// Actualizar un servicio escolar por ID
router.put('/serviciosEscolares/:id', serviciosEscolaresController.updateServicioEscolar);

// Eliminar un servicio escolar por ID
router.delete('/serviciosEscolares/:id', serviciosEscolaresController.deleteServicioEscolar);

module.exports = router;
