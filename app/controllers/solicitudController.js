const Solicitud = require('../models/solicitudModel');

// Obtener todas las solicitudes
exports.getSolicitudes = async (req, res) => {
    try {
        const solicitudes = await Solicitud.find();
        res.status(200).json(solicitudes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todas las solicitudes filtradas por nombreEmpresa
exports.getSolicitudes = async (req, res) => {
    try {
        const nombreEmpresa = req.query.nombreEmpresa; // Obtiene el nombre de la empresa desde la query
        
        // Si no se pasa un nombre de empresa, devuelve todas las solicitudes
        if (!nombreEmpresa) {
            const solicitudes = await Solicitud.find();
            return res.status(200).json(solicitudes);
        }
        
        // Filtra las solicitudes por nombreEmpresa
        const solicitudes = await Solicitud.find({ nombreEmpresa: nombreEmpresa });
        
        if (solicitudes.length === 0) {
            return res.status(404).json({ message: "No se encontraron solicitudes para esta empresa" });
        }

        res.status(200).json(solicitudes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una solicitud por ID
exports.getSolicitudById = async (req, res) => {
    try {
        const solicitud = await Solicitud.findById(req.params.id);
        if (!solicitud) return res.status(404).json({ message: "Solicitud no encontrada" });
        res.status(200).json(solicitud);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una nueva solicitud
exports.createSolicitud = async (req, res) => {
    try {
        const nuevaSolicitud = new Solicitud(req.body);
        const solicitudGuardada = await nuevaSolicitud.save();
        res.status(201).json(solicitudGuardada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar una solicitud por ID
exports.updateSolicitud = async (req, res) => {
    try {
        const solicitudActualizada = await Solicitud.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!solicitudActualizada) return res.status(404).json({ message: "Solicitud no encontrada" });
        res.status(200).json(solicitudActualizada);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar una solicitud por ID
exports.deleteSolicitud = async (req, res) => {
    try {
        const solicitudEliminada = await Solicitud.findByIdAndDelete(req.params.id);
        if (!solicitudEliminada) return res.status(404).json({ message: "Solicitud no encontrada" });
        res.status(200).json({ message: "Solicitud eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
