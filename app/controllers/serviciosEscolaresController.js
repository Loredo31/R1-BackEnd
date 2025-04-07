const ServiciosEscolares = require('../models/serviciosEscolaresModel');
const bcrypt = require('bcryptjs');

// Crear un nuevo servicio escolar
exports.createServiciosEscolares = async (req, res) => {
    try {
        const { nombre, puesto, correo, telefono, extension, contrasenia, universidad, departamento, funciones } = req.body;

        // Verificar si el correo ya existe
        const servicioExistente = await ServiciosEscolares.findOne({ correo });
        if (servicioExistente) {
            return res.status(400).json({ message: "El correo ya está registrado" });
        }

        // Hashear la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(contrasenia, salt);

        // Crear nuevo servicio escolar con contraseña encriptada
        const nuevoServicioEscolar = new ServiciosEscolares({
            nombre,
            puesto,
            correo,
            telefono,
            extension,
            contrasenia: hashedPassword, 
            universidad,
            departamento,
            funciones
        });

        await nuevoServicioEscolar.save();
        res.status(201).json({ message: "Servicio escolar creado exitosamente", servicioEscolar: nuevoServicioEscolar });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el servicio escolar', error });
    }
};

// Obtener todos los servicios escolares
exports.getServiciosEscolares = async (req, res) => {
    try {
        const serviciosEscolares = await ServiciosEscolares.find();
        res.json(serviciosEscolares);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los servicios escolares', error });
    }
};

// Obtener un servicio escolar por ID
exports.getServicioEscolarById = async (req, res) => {
    try {
        const servicioEscolar = await ServiciosEscolares.findById(req.params.id);
        if (!servicioEscolar) return res.status(404).json({ message: 'Servicio escolar no encontrado' });
        res.json(servicioEscolar);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el servicio escolar', error });
    }
};

// Actualizar un servicio escolar por ID
exports.updateServicioEscolar = async (req, res) => {
    try {
        const { contrasenia } = req.body;

        // Si se proporciona una nueva contraseña, se encripta
        if (contrasenia) {
            const salt = await bcrypt.genSalt(10);
            req.body.contrasenia = await bcrypt.hash(contrasenia, salt);
        }

        const servicioEscolarActualizado = await ServiciosEscolares.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!servicioEscolarActualizado) return res.status(404).json({ message: 'Servicio escolar no encontrado' });

        res.json({ message: 'Servicio escolar actualizado correctamente', servicioEscolar: servicioEscolarActualizado });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el servicio escolar', error });
    }
};

// Eliminar un servicio escolar por ID
exports.deleteServicioEscolar = async (req, res) => {
    try {
        const servicioEscolarEliminado = await ServiciosEscolares.findByIdAndDelete(req.params.id);
        if (!servicioEscolarEliminado) return res.status(404).json({ message: 'Servicio escolar no encontrado' });
        res.json({ message: 'Servicio escolar eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el servicio escolar', error });
    }
};
