const modelCliente = require('../models/modelCliente');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registro de cliente
exports.registrarCliente = async (req, res) => {
  try {
    const { nombre, tipoid, id, correo, telefono, direccion, ciudad, password } = req.body;

    // Validar correo único
    const correoExistente = await modelCliente.findOne({ correo });
    if (correoExistente) {
      return res.status(409).json({ error: 'El correo ya está registrado' });
    }

    // Validar ID único
    const idExistente = await modelCliente.findOne({ id });
    if (idExistente) {
      return res.status(409).json({ error: 'El número de identificación ya está registrado' });
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear cliente
    const nuevoCliente = new modelCliente({nombre, tipoid, id, correo, telefono, direccion, ciudad, password: hashedPassword});
    await nuevoCliente.save();

    // Generar token JWT
    const token = jwt.sign({ id: nuevoCliente._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ cliente: nuevoCliente, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login de cliente
exports.loginCliente = async (req, res) => {
  try {
    const { correo, password } = req.body;

    // Buscar cliente por correo
    const cliente = await modelCliente.findOne({ correo });
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    // Verificar contraseña
    const passwordValida = await bcrypt.compare(password, cliente.password);
    if (!passwordValida) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Generar token JWT
    const token = jwt.sign({ id: cliente._id }, process.env.JWT_SECRET,{ expiresIn: '1h' }
);

    // Enviar cliente sin contraseña
    res.json({ cliente, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Obtener Clientes
exports.obtenerCliente = async(req, res) =>{
    try {
        const dataCliente =  await modelCliente.find();
        res.json(dataCliente);
    } catch (error) {
        console.log(error);
        res.status(500).send({message:'Error al consultar cliente'});
    }
}

//Actualizar Cliente
exports.actualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const datosActualizados = { ...req.body };
    const clienteActualizado = await modelCliente.findByIdAndUpdate(
      id,
      datosActualizados,
      { new: true, runValidators: true }
    );
    if (!clienteActualizado) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.json(clienteActualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error al actualizar el Cliente',
      detalle: error.message
    });
  }
};

//Perfil Cliente
exports.obtenerPerfil = async (req, res) => {
  try {
    const cliente = await modelCliente.findById(req.userId).select('-password');
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener perfil' });
  }
};