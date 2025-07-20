const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const tokenHeader = req.headers.authorization;

  if (!tokenHeader || !tokenHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token de autenticación requerido' });
  }

  const token = tokenHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Token inválido o expirado' });
  }
};

module.exports = authMiddleware;