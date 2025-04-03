// const Empresa = require("../models/empresaModel"); 
// const ServiciosEscolare = require("../models/serviciosEscolaresModel");
// const bcrypt = require('bcryptjs');  
// const jwt = require('jsonwebtoken');
// const login = async (req, res) => {
//     const { correo, contrasenia } = req.body;
  
//   try {
//     // Buscar empresa por correo
//     const empresaEncontrada = await Empresa.findOne({ correo: correo });
//     if (!empresaEncontrada) {
//       return res.status(404).json({ msg: "Empresa no encontrada" });
//     }

//     // Comparar contraseñas
//     const passwordMatch = await bcrypt.compare(contrasenia, empresaEncontrada.contrasenia);
//     if (!passwordMatch) {
//       return res.status(401).json({ msg: "Contraseña incorrecta" });
//     }

//     // Generar Token JWT
//     const token = jwt.sign(
//       { id: empresaEncontrada._id, rol: empresaEncontrada.rol, nombre: empresaEncontrada.nombreEmpresa },
//       process.env.JWT_SECRET,
//       { expiresIn: "8h" }
//     );

//     res.json({
//       msg: "Inicio de sesión exitoso",
//       token,
//       empresa: {
//         id: empresaEncontrada._id,
//         correo: empresaEncontrada.correo,
//         nombre: empresaEncontrada.nombreEmpresa,
//         rol: empresaEncontrada.rol,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: "Error en el servidor", error: error.message || error });
//   }
// };

// module.exports = { login };




const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Empresa = require('../models/empresaModel');
const ServiciosEscolares = require('../models/serviciosEscolaresModel');

// Login unificado para Empresas y ServiciosEscolares (sin rol en la solicitud)
exports.login = async (req, res) => {
    const { correo, contrasenia } = req.body;
    console.log("Datos recibidos:", { correo, contrasenia });

    try {
        let usuarioEncontrado;
        let tipoUsuario;

        // Buscar primero en Empresa
        usuarioEncontrado = await Empresa.findOne({ correo });
        if (usuarioEncontrado) {
            tipoUsuario = "Empresa";
        } else {
            // Si no está en Empresa, buscar en ServiciosEscolares
            usuarioEncontrado = await ServiciosEscolares.findOne({ correo });
            if (usuarioEncontrado) {
                tipoUsuario = "ServiciosEscolares";
            }
        }

        // Si el usuario no se encuentra en ninguna colección
        if (!usuarioEncontrado) {
            console.log("Usuario no encontrado en la base de datos.");
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        console.log("Usuario encontrado en:", tipoUsuario, usuarioEncontrado);

        // Comparar contraseñas
        const passwordMatch = await bcrypt.compare(contrasenia, usuarioEncontrado.contrasenia);
        if (!passwordMatch) {
            console.log("Contraseña incorrecta");
            return res.status(401).json({ msg: 'Contraseña incorrecta' });
        }

        // Generar Token JWT
        const token = jwt.sign(
            {
                id: usuarioEncontrado._id,
                rol: tipoUsuario, // Se usa el tipo de usuario detectado
                nombre: usuarioEncontrado.nombreEmpresa || usuarioEncontrado.Nombre
            },
            process.env.JWT_SECRET,
            { expiresIn: "8h" }
        );

        res.json({
            msg: "Inicio de sesión exitoso",
            token,
            usuario: {
                id: usuarioEncontrado._id,
                correo: usuarioEncontrado.correo || usuarioEncontrado.Correo,
                nombre: usuarioEncontrado.nombreEmpresa || usuarioEncontrado.Nombre,
                rol: tipoUsuario
            },
        });

    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ msg: 'Error en el servidor', error: error.message || error });
    }
};
