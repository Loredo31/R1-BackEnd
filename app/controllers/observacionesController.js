const Observacion = require('../models/Observacion');

// Controlador para obtener las observaciones de un profesor específico
exports.obtenerObservacionesPorProfesor = async (req, res) => {
  const { profesorId } = req.params;  // Obtener el ID del profesor desde los parámetros de la ruta

  try {
    // Buscar las observaciones asociadas a un profesor
    const observaciones = await Observacion.find({ teacherId: profesorId });
    res.status(200).json(observaciones);  // Responder con las observaciones encontradas
  } catch (error) {
    console.error('Error al obtener las observaciones:', error);
    res.status(500).json({ message: 'Error al obtener las observaciones', error: error.message });
  }
};

// Controlador para agregar una nueva observación
exports.agregarObservacion = async (req, res) => {
  const { teacherId, teacherName, studentName, subject, semester, year, description } = req.body;

  if (!teacherId || !teacherName) {
    return res.status(400).json({ message: 'El profesor es obligatorio' });
  }

  try {
    // Crear un nuevo objeto de observación con los datos recibidos
    const nuevaObservacion = new Observacion({
      teacherId,
      teacherName,
      studentName,
      subject,
      semester,
      year,
      description
    });

    // Guardar la nueva observación en la base de datos
    await nuevaObservacion.save();
    res.status(201).json({ message: 'Observación guardada correctamente', observacion: nuevaObservacion });
  } catch (error) {
    console.error('Error al guardar la observación:', error);
    res.status(500).json({ message: 'Error al guardar la observación', error: error.message });
  }
};

// Controlador para eliminar una observación
exports.eliminarObservacion = async (req, res) => {
  const { id } = req.params;  // Obtener el ID de la observación desde los parámetros de la ruta

  try {
    // Eliminar la observación de la base de datos por su ID
    const observacionEliminada = await Observacion.findByIdAndDelete(id);

    if (!observacionEliminada) {
      return res.status(404).json({ message: 'Observación no encontrada' });
    }

    res.status(200).json({ message: 'Observación eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la observación:', error);
    res.status(500).json({ message: 'Error al eliminar la observación', error: error.message });
  }
};



// Agregar la lógica para buscar observaciones con filtros
// Controlador para obtener observaciones filtradas por estudiante
exports.obtenerObservacionesPorFiltro = async (req, res) => {
  const { studentName, subject, teacherName } = req.query; // Obtener los filtros desde la query string

  const filter = {};  // Crear un objeto vacío para los filtros

  if (studentName) {
    filter.studentName = { $regex: studentName, $options: 'i' }; // Filtrar por nombre de estudiante (insensible a mayúsculas/minúsculas)
  }

  if (subject) {
    filter.subject = { $regex: subject, $options: 'i' }; // Filtrar por materia (insensible a mayúsculas/minúsculas)
  }

  if (teacherName) {
    filter.teacherName = { $regex: teacherName, $options: 'i' }; // Filtrar por nombre del profesor (insensible a mayúsculas/minúsculas)
  }

  try {
    // Buscar observaciones con los filtros aplicados
    const observaciones = await Observacion.find(filter);
    res.status(200).json(observaciones);
  } catch (error) {
    console.error('Error al buscar las observaciones con filtro:', error);
    res.status(500).json({ message: 'Error al buscar las observaciones', error: error.message });
  }
};


