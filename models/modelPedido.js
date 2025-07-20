const mongoose = require('mongoose');
const detalleProductoSchema = require('./modelDetalleProducto');

const pedidoSchema = new mongoose.Schema({
  clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  productos: [detalleProductoSchema],
  totalPedido: Number,
  estado: { type: String, enum: ['pendiente', 'pagado', 'enviado'], default: 'pendiente' },
  fechaPedido: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pedido', pedidoSchema);