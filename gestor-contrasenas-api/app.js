// Punto de entrada del backend
// Configura Express, define rutas y sirve la aplicacion de React

const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;


//Llamamos la conexion de la base de datos
connectDB();

app.use(cors());

//Middleware para parsear el JSON
app.use(express.json());


//Rutas de la API
app.use('/gestor/users', require('./routes/user.routes'));
app.use('/gestor/passwords', require('./routes/password.routes'));
app.use('/gestor/plan', require('./routes/plan.routes'));
app.use('/gestor/payment', require('./routes/payment.routes'));

//Servimos los archivos Estaticos(React)
app.use(express.static('public'));

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})


//Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor Corriente en el puerto ${PORT}`);
});