const mongoose = require('mongoose');
const validator = require('validator');

const clienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  tipoid: { type: String, required: true },
  id: { type: Number, required: true, unique: true },
  correo: { type: String, required: true, unique: true, lowercase: true, validate: {validator: validator.isEmail, message: 'Formato de correo inválido'}},
  telefono: { type: String },
  direccion: { type: String },
  ciudad: { type: String },
  fechaRegistro: { type: Date, default: Date.now },
  activo: { type: Boolean, default: true },
  password: { type: String, required: true, minlength: 6 },
  ultimaActualizacion: { type: Date },
  actualizadoPor: { type: String }
});

// Ocultar contraseña en respuestas JSON
clienteSchema.methods.toJSON = function () {
  const cliente = this.toObject();
  delete cliente.password;
  return cliente;
};

module.exports = mongoose.model('Cliente', clienteSchema);
