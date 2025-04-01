const Alumno = require('../models/alumnosModel');
const bcrypt = require('bcryptjs');

// Función para crear un nuevo alumno
const crearAlumno = async (req, res) => {
  const { nombre,foto, apellido_paterno, apellido_materno, fecha_nacimiento, sexo, correos, contrasenia, ...resto } = req.body;

  // Verifica si los campos requeridos están presentes
  if (!nombre || !apellido_paterno || !apellido_materno || !fecha_nacimiento || !sexo) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }

  try {
    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);  // Generar un salt con 10 rondas
    const contraseniaHasheada = await bcrypt.hash(contrasenia, salt);  // Hashear la contraseña

    // Crear un nuevo alumno
    const nuevoAlumno = new Alumno({
      matricula: resto.matricula, // Asigna la matrícula en el formato requerido
      foto: foto,
      apellido_paterno,
      apellido_materno,
      nombre,
      fecha_alta: new Date(),  // Fecha de alta asignada automáticamente
      fecha_nacimiento,
      sexo,
      telefonos: resto.telefonos,  // Se pueden incluir múltiples teléfonos
      correos: correos,  // Correos en formato array
      promedio_bachillerato: resto.promedio_bachillerato,  // Valor de promedio
      especialidad_bachillerato: resto.especialidad_bachillerato,  // Especialidad de bachillerato
      rfc: resto.rfc,  // RFC generado, ajustarlo si es necesario
      rol: 1,  // Definir el rol como Administrador (1)
      contrasenia:contraseniaHasheada,
      domicilio: {
        calle: resto.domicilio.calle,
        numero_interior: resto.domicilio.numero_interior,
        numero_exterior: resto.domicilio.numero_exterior,
        colonia: resto.domicilio.colonia,
        codigo_postal: resto.domicilio.codigo_postal,
        ciudad: resto.domicilio.ciudad
      },
      tutores: resto.tutores,  // Información de tutores, si se proporciona
      carrera: {
        nombre: resto.carrera.nombre,
        especialidad: resto.carrera.especialidad
      },
      certificado_bachillerato: resto.certificado_bachillerato ? 1 : 0  // Certificado de bachillerato (1 para sí, 0 para no)
    });

    // Guardar el alumno en la base de datos
    await nuevoAlumno.save();

    // Devolver la respuesta con el alumno creado (incluyendo la matrícula y el RFC generados)
    res.status(201).json(nuevoAlumno);
  } catch (error) {
    console.error('Error al registrar alumno:', error);
    res.status(400).json({
      message: 'Error al registrar alumno',
      error: error.message,  // Devuelve el mensaje del error
      stack: error.stack     // Devuelve el stack trace para obtener más detalles
    });
  }
}

  // Obtener todos los alumnos
const obtenerAlumnos = async (req, res) => {
  try {
    const alumnos = await Alumno.find();
    res.status(200).json(alumnos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los alumnos', error: error.message });
  }
};

// Obtener un alumno por ID
const obtenerAlumnoPorId = async (req, res) => {
  try {
    const alumno = await Alumno.findById(req.params.id);
    if (!alumno) return res.status(404).json({ message: 'Alumno no encontrado' });
    res.status(200).json(alumno);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el alumno', error: error.message });
  }
};

// Actualizar un alumno por ID
const actualizarAlumno = async (req, res) => {
  try {
    const alumnoActualizado = await Alumno.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!alumnoActualizado) return res.status(404).json({ message: 'Alumno no encontrado' });
    res.status(200).json(alumnoActualizado);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el alumno', error: error.message });
  }
};

// Eliminar un alumno por ID
const eliminarAlumno = async (req, res) => {
  try {
    const alumnoEliminado = await Alumno.findByIdAndDelete(req.params.id);
    if (!alumnoEliminado) return res.status(404).json({ message: 'Alumno no encontrado' });
    res.status(200).json({ message: 'Alumno eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el alumno', error: error.message });
  }
};

module.exports = {
  crearAlumno,
  obtenerAlumnos,
  obtenerAlumnoPorId,
  actualizarAlumno,
  eliminarAlumno,
};