const express = require('express');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use('/gestor', require('./routes/user.routes'));


app.listen(PORT, () => {
    console.log(`Servidor Corriente en el puerto ${PORT}`);
});