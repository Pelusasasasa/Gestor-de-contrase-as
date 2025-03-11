const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());

app.use(express.json());

app.use( express.static('public'));

app.use('/gestor/users', require('./routes/user.routes'));
app.use('/gestor/passwords', require('./routes/password.routes'));


app.use('*', (req, res) => {
    res.sendFile( path.join(__dirname, 'public/index.html'));
})

app.listen(PORT, () => {
    console.log(`Servidor Corriente en el puerto ${PORT}`);
});