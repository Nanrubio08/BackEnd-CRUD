module.exports = (req, res, next) => {
  const { nombre, tipoid, id, correo, password } = req.body;

  // Campos obligatorios
  if (!nombre || !tipoid || !id || !correo || !password) {
    return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes' });
  }

  // ID numérico
  if (typeof id !== 'number') {
    return res.status(400).json({ error: 'El número de identificación debe ser un valor numérico' });
  }

  // Contraseña mínima
  if (password.length < 6) {
    return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
  }

  // Validación básica de correo
  const formatoCorreoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formatoCorreoValido.test(correo)) {
    return res.status(400).json({ error: 'El formato del correo es inválido' });
  }

  next();
};