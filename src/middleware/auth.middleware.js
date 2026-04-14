const jwt = require('jsonwebtoken');
const createError = require('../utils/createError');

const getTokenFromHeader = (authorizationHeader) => {
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return null;
  }

  return authorizationHeader.split(' ')[1];
};

const verifyToken = (req, res, next) => {
  try {
    const token = getTokenFromHeader(req.headers.authorization);

    if (!token) {
      return next(
        createError(401, 'Unauthorized', 'Token is missing or Authorization header is invalid')
      );
    }

    if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'replace_with_a_secure_secret') {
      return next(
        createError(500, 'Server error', 'JWT_SECRET is not configured. Add a secure value in the .env file.')
      );
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Attach only the values we need for protected routes.
    req.user = {
      id: decodedToken.id,
      role: decodedToken.role
    };

    return next();
  } catch (error) {
    return next(error);
  }
};

const checkRole = (role) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return next(createError(401, 'Unauthorized', 'User data is missing from the request'));
      }

      if (req.user.role !== role) {
        return next(createError(403, 'Forbidden', `Access denied. ${role} role is required`));
      }

      return next();
    } catch (error) {
      return next(error);
    }
  };
};

module.exports = {
  verifyToken,
  checkRole
};
