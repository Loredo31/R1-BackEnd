const express = require('express');
const router = express.Router();
const solicitudController = require('../controllers/solicitudController');

// Obtener todas las solicitudes
router.get('/solicitudes', solicitudController.getSolicitudes);

// Obtener una solicitud por su ID
router.get('/solicitudes/:id', solicitudController.getSolicitudById);

// Crear una nueva solicitud
router.post('/solicitudes', solicitudController.createSolicitud);

// Actualizar una solicitud por su ID
router.put('/solicitudes/:id', solicitudController.updateSolicitud);

// Eliminar una solicitud por su ID
router.delete('/solicitudes/:id', solicitudController.deleteSolicitud);

module.exports = router;
