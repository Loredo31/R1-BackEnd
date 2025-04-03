const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresaController');

// Ruta para obtener todas las empresas registradas
router.get('/empresas', empresaController.getEmpresas);

// Ruta para obtener una empresa específica por su ID
router.get('/empresas/:id', empresaController.getEmpresaById);

// Ruta para registrar una nueva empresa
router.post('/empresas', empresaController.createEmpresa);

// Ruta para actualizar una empresa por su ID
router.put('/empresas/:id', empresaController.updateEmpresa);

// Ruta para eliminar una empresa por su ID
router.delete('/empresas/:id', empresaController.deleteEmpresa);

module.exports = router;
