require('dotenv').config(); // Esto carga las variables de tu archivo .env
express = require('express');
const cors = require('cors');
const conectarDB = require('./config/db');
const alumnosRoutes= require('./app/routes/alumnosRoutes');
const profesorExtRoutes= require('./app/routes/profesorExtRoutes');
const login= require('./app/routes/authRoutes')
const observacionesRoutes = require('./app/routes/observaciones');  // Rutas de observaciones
const carreraRoutes = require('./app/routes/carreraRoutes')
const profesorRoutes = require('./app/routes/profesorRoutes');  // Rutas de profesores
const app = express();

// Conectar a la base de datos MongoDB
conectarDB();

// Middleware
app.use(express.json());  // Para manejar solicitudes con JSON
app.use(cors());  // Para habilitar CORS y permitir peticiones desde otros dominios
app.use(express.json({ limit: '500mb' })); 
app.use("/api", alumnosRoutes);
app.use("/api", profesorExtRoutes);
app.use("/api", login);
app.use("/api/observaciones", observacionesRoutes);  // Rutas de observaciones
app.use('/api/carreras', carreraRoutes);  // Rutas de carreras
app.use('/api/profesores', profesorRoutes);  // Rutas de profesores

// Configuración del puerto del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});