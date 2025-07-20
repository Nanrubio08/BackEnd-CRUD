const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    idProducto: {type: Number, require: true, unique: true},
    nombreProducto: { type: String, required: true },
    descripcion: { type: String },
    categoria: { type: String, required: true },
    subCategoria: {type: String, require: true},
    precioUnitario: { type: Number, required: true },
    stock: { type: Number },
    imagenURL: { type: String },
    disponible: { type: Boolean, default: true },
});

module.exports = mongoose.model('Producto', productoSchema);