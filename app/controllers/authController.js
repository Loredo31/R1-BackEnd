const Alumno = require("../models/alumnosModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    const { matricula, password } = req.body;
  

  try {
    // Buscar empleado por clave
    const alumno = await Alumno.findOne({ matricula: matricula });
    if (!alumno) {
      return res.status(404).json({ msg: "Empleado no encontrado" });
    }

    // Comparar contraseñas
    const passwordMatch = await bcrypt.compare(password, alumno.contrasenia);
    if (!passwordMatch) {
      return res.status(401).json({ msg: "Contraseña incorrecta" });
    }

    // Generar Token JWT
    const token = jwt.sign(
      { id: alumno._id, rol: alumno.rol, nombre: alumno.nombre },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({
      msg: "Inicio de sesión exitoso",
      token,
      alumno: {
        id: alumno._id,
        matricula: alumno.matricula,
        nombre: alumno.nombre,
        apellido_paterno: alumno.apellido_paterno,
        rol: alumno.rol,
      },
    });
  } catch (error) {
    console.error(error);  // Esto imprimirá el error completo en la consola
    res.status(500).json({ msg: "Error en el servidor", error: error.message || error });
  }
  
};
module.exports = { login };