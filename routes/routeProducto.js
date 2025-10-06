const express = require('express');
const routerProducto = express.Router();
const productoController = require('../controllers/productoController');
const authMiddleware = require('../middlewares/authCliente');

routerProducto.post('/crear', authMiddleware,productoController.crearProducto);
routerProducto.get('/obtener', productoController.obtenerProducto);
routerProducto.get('/obtener/:categoria', productoController.obtenerProductoPorCat);
routerProducto.patch('/actualizar/:id',authMiddleware,productoController.actualizarProducto);
routerProducto.get('/obtener/subcategoria/:subcategoria', productoController.obtenerPorSubcategoria);

module.exports = routerProducto;