const express = require('express');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use('/gestor/users', require('./routes/user.routes'));
app.use('/gestor/passwords', require('./routes/password.routes'));


app.listen(PORT, () => {
    console.log(`Servidor Corriente en el puerto ${PORT}`);
});