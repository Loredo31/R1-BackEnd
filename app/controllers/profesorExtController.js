const Alumno = require('../models/alumnosModel'); // Importamos el modelo Alumno

// Función para actualizar los campos nombre_actividad, fecha_inicio_actividad y fecha_fin_actividad
const actualizarActividadAlumno = async (req, res) => {
  const { nombre_actividad, fecha_inicio_actividad, fecha_fin_actividad } = req.body;

  // Verificamos si los campos obligatorios están presentes
  if (nombre_actividad === undefined && fecha_inicio_actividad === undefined && fecha_fin_actividad === undefined) {
    return res.status(400).json({ message: 'Debe proporcionar al menos uno de los campos a actualizar' });
  }

  try {
    console.log('ID recibido:', req.params.id);
    // Verifica si el alumno existe en la base de datos
    const alumno = await Alumno.findById(req.params.id); // Asegúrate de que `findById` esté funcionando
    if (!alumno) {
      return res.status(404).json({ message: 'Alumno no encontrado' });
    }


    // Actualiza los campos de la actividad del alumno
    alumno.nombre_actividad = nombre_actividad || null;
    alumno.fecha_inicio_actividad = fecha_inicio_actividad || null;
    alumno.fecha_fin_actividad = fecha_fin_actividad || null;

    // Guardar los cambios en la base de datos
    await alumno.save();

    res.status(200).json(alumno); // Retorna el alumno actualizado
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la actividad del alumno', error: error.message });
  }
};

module.exports = {
  actualizarActividadAlumno,
};
