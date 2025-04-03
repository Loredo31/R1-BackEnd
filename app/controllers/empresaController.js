const Empresa = require('../models/empresaModel');
const bcrypt = require('bcryptjs');

// Obtener todas las empresas
exports.getEmpresas = async (req, res) => {
    try {
        const empresas = await Empresa.find();
        res.json(empresas);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener empresas", error });
    }
};

// Obtener una empresa por ID
exports.getEmpresaById = async (req, res) => {
    try {
        const empresa = await Empresa.findById(req.params.id);
        if (!empresa) return res.status(404).json({ message: "Empresa no encontrada" });
        res.json(empresa);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la empresa", error });
    }
};

// Crear una nueva empresa con contraseña encriptada
exports.createEmpresa = async (req, res) => {
    try {
        const { nombreEmpresa, giro, correo, telefono, direccion, contrasenia } = req.body;

        // Verificar si el correo ya existe
        const empresaExistente = await Empresa.findOne({ correo });
        if (empresaExistente) {
            return res.status(400).json({ message: "El correo ya está registrado" });
        }

        // Hashear la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(contrasenia, salt);

        // Crear nueva empresa con contraseña encriptada
        const nuevaEmpresa = new Empresa({
            nombreEmpresa,
            giro,
            correo,
            telefono,
            direccion,
            contrasenia: hashedPassword // Guardar la contraseña encriptada
        });

        await nuevaEmpresa.save();
        res.status(201).json({ message: "Empresa creada exitosamente", empresa: nuevaEmpresa });

    } catch (error) {
        res.status(500).json({ message: "Error al registrar la empresa", error });
    }
};

// Actualizar una empresa por ID
exports.updateEmpresa = async (req, res) => {
    try {
        const { contrasenia } = req.body;

        // Si se proporciona una nueva contraseña, se encripta
        if (contrasenia) {
            const salt = await bcrypt.genSalt(10);
            req.body.contrasenia = await bcrypt.hash(contrasenia, salt);
        }

        const empresaActualizada = await Empresa.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!empresaActualizada) return res.status(404).json({ message: "Empresa no encontrada" });

        res.json({ message: "Empresa actualizada correctamente", empresa: empresaActualizada });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la empresa", error });
    }
};

// Eliminar una empresa por ID
exports.deleteEmpresa = async (req, res) => {
    try {
        const empresaEliminada = await Empresa.findByIdAndDelete(req.params.id);
        if (!empresaEliminada) return res.status(404).json({ message: "Empresa no encontrada" });

        res.json({ message: "Empresa eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la empresa", error });
    }
};
