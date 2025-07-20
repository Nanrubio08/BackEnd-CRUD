const express = require('express');
const routerCliente = express.Router();
const clienteController = require('../controllers/clienteController');
const authMiddleware = require('../middlewares/authCliente');
const validacionCampos = require('../middlewares/validacionCampos');

routerCliente.post('/registrar', validacionCampos, clienteController.registrarCliente);
routerCliente.post('/login', clienteController.loginCliente);
routerCliente.get('/obtener', authMiddleware, clienteController.obtenerCliente);
routerCliente.patch('/actualizar/:id', authMiddleware, clienteController.actualizarCliente);
routerCliente.get('/perfil', authMiddleware, clienteController.obtenerPerfil);

module.exports = routerCliente;
