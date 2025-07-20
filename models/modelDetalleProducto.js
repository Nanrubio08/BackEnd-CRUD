const mongoose = require('mongoose');

const detalleProductoSchema = new mongoose.Schema({
  productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
  nombreProducto: String,
  cantidad: { type: Number, required: true },
  precioUnitario: { type: Number, required: true },
  subtotal: Number
});

module.exports = detalleProductoSchema;