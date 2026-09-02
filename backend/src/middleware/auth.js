const jwt = require('jsonwebtoken');

function getJwtSecret() {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET non configurato');
  }

  return process.env.JWT_SECRET;
}

function authenticate(req, res, next) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization?.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Token di autenticazione mancante'
      });
    }

    const token = authorization.slice(7).trim();

    const payload = jwt.verify(token, getJwtSecret(), {
      algorithms: ['HS256']
    });

    if (!payload.userId) {
      return res.status(401).json({
        success: false,
        message: 'Token privo di identità utente'
      });
    }

    req.userId = String(payload.userId);
    req.username = payload.username;
    req.userRole = payload.role || 'user';

    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.name === 'TokenExpiredError'
        ? 'Token scaduto'
        : 'Token non valido'
    });
  }
}

function optionalAuthenticate(req, res, next) {
  if (!req.headers.authorization) {
    return next();
  }

  return authenticate(req, res, next);
}

function isAdmin(req, res, next) {
  if (req.userRole !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Permessi amministratore richiesti'
    });
  }

  return next();
}

module.exports = {
  authenticate,
  optionalAuthenticate,
  isAdmin
};
