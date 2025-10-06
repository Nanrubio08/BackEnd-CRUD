require('dotenv').config();
const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

const routerProducto = require('./routes/routeProducto');
const routerCliente = require('./routes/routeCliente');

conectarDB();


app.use(cors({
  origin: 'http://localhost:4200', 
  methods: ['GET'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.static('public'));
app.use(express.json());

app.use('/api/producto', routerProducto);
app.use('/api/cliente', routerCliente);

// ✅ Ruta para servir imágenes desde /uploads
app.get('/api/imagen/:nombre', (req, res) => {
  const ruta = path.join(__dirname, 'uploads', req.params.nombre);

  fs.access(ruta, fs.constants.F_OK, err => {
    if (err) {
      return res.status(404).json({ error: 'Imagen no encontrada' });
    }
    res.sendFile(ruta);
  });
});

app.listen(port, () => {
  console.log(`Servidor activo en el puerto ${port}`);
  console.log('Bienvenido');
});