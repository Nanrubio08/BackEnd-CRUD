require('dotenv').config();
const express = require('express');
const conectarDB = require('./config/db');
const app = express();
const port = 3000;
const routerProducto = require('./routes/routeProducto');
const routerCliente = require('./routes/routeCliente');
const cors = require('cors');

conectarDB();

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.use('/api/producto', routerProducto);
app.use('/api/cliente', routerCliente);

app.listen(port, () => {
    console.log("Servidor activo en el puerto "+ port)
    console.log("Bienvenido")
});
