const Alumno = require('../models/alumnosModel'); // Importa el modelo de alumnos

// Obtener el último consecutivo
exports.obtenerUltimoConsecutivo = async (req, res) => {
  try {
    // Buscar el último alumno por matrícula, ordenado de forma descendente
    const ultimoAlumno = await Alumno.findOne().sort({ matricula: -1 });

    let consecutivo = 1; // Valor inicial del consecutivo

    if (ultimoAlumno) {
      // Verificar el formato de la matrícula y extraer la parte numérica
      const matricula = ultimoAlumno.matricula;
      const claveSplit = matricula.slice(4); // Obtener solo el consecutivo numérico después de los primeros 4 caracteres

      console.log(`Última matrícula: ${matricula}`); // Verificar el formato de la matrícula
      console.log(`Parte numérica de la matrícula: ${claveSplit}`); // Verificar qué parte numérica estamos obteniendo

      // Asegurarse de que la parte numérica sea válida
      if (!isNaN(claveSplit)) {
        consecutivo = parseInt(claveSplit, 10); // Obtener el valor numérico de la matrícula
        console.log(`Consecutivo extraído: ${consecutivo}`); // Verificar el consecutivo antes de sumarlo
      } else {
        // Si no es un número válido, devolver un error
        console.error('La matrícula no tiene un formato válido para extraer el consecutivo.');
        consecutivo = 1; // Volver al valor inicial
      }
    }

    // Sumar 1 al consecutivo y asegurarse de que sea de 4 dígitos
    consecutivo += 1; // Sumar 1 al consecutivo
    console.log(`Consecutivo incrementado: ${consecutivo}`); // Verificar el consecutivo después de sumarlo

    const consecutivoFormateado = consecutivo.toString().padStart(4, '0'); // Asegurarse de que tenga 4 dígitos
    console.log(`Consecutivo formateado: ${consecutivoFormateado}`); // Verificar el consecutivo final

    res.json({ consecutivo: consecutivoFormateado }); // Responde con el consecutivo incrementado
  } catch (error) {
    console.error('Error al obtener el consecutivo:', error);
    res.status(500).json({ error: 'Error al obtener el consecutivo' });
  }
};
