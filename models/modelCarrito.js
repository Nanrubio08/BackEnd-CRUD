const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
  clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  productos: [productoCarritoSchema],
  totalCarrito: { type: Number }, // suma de subtotales
  estado: { type: String, enum: ['activo', 'procesado'], default: 'activo' },
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Carrito', carritoSchema);