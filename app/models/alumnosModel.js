const mongoose = require('mongoose');

const alumnoSchema = new mongoose.Schema({
  matricula: { type: String, unique: true, required: true },
  foto: String,
  apellido_paterno: String,
  apellido_materno: String,
  nombre: String,
  fecha_alta: { type: Date, default: Date.now },
  fecha_nacimiento: Date,
  sexo: String,
  nombre_actividad: { type: String, required: false, default: null },  // Nuevo campo
  fecha_inicio_actividad: { type: Date, required: false, default: null }, // Nuevo campo
  fecha_fin_actividad: { type: Date, required: false, default: null },  // Nuevo campo
  telefonos: [String],
  correos: [String],
  promedio_bachillerato: Number,
  especialidad_bachillerato: String,
  rfc: String,
  rol: { type: Number, default: 1 },
  contrasenia: String,
  domicilio: {
    calle: String,
    numero_interior: String,
    numero_exterior: String,
    colonia: String,
    codigo_postal: String,
    ciudad: String
  },
  tutores: [
    {
      apellido_paterno: String,
      apellido_materno: String,
      nombre: String,
      telefonos: [String],
      correos: [String],
      domicilio: {
        calle: String,
        numero_exterior: String,
        numero_interior: String,
        colonia: String,
        codigo_postal: String,
        ciudad: String
      }
    }
  ],
  carrera: {
    nombre: String,
    especialidad: String
  },
  certificado_bachillerato: { type: Number, default: 0 }  // 1 para "Sí", 0 para "No"
});

const Alumno = mongoose.model('Alumno', alumnoSchema);

module.exports = Alumno;
