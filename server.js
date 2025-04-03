require('dotenv').config(); 
express = require('express');
const cors = require('cors');
const conectarDB = require('./config/db');
const app = express();

const login= require('./app/routes/authRoutes')
const solicitudRoutes = require('./app/routes/solicitudRoutes');
const empresaRoutes = require('./app/routes/empresaRoutes');
const serviciosEscolaresRoutes = require('./app/routes/serviciosEscolaresRoutes');

// Conectar a la base de datos MongoDB
conectarDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.json({ limit: '500mb' })); 
app.use("/api", login);
app.use("/api", solicitudRoutes);
app.use("/api", empresaRoutes);
app.use("/api", serviciosEscolaresRoutes);


// Configuración del puerto del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});