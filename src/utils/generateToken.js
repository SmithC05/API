const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'replace_with_a_secure_secret') {
    const error = new Error('Server error');
    error.statusCode = 500;
    error.error = 'JWT_SECRET is not configured. Add a secure value in the .env file.';
    throw error;
  }

  // Keep the token payload small.
  // We only store the values we will need later.
  return jwt.sign(
    {
      id: user.id,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '1d'
    }
  );
};

module.exports = generateToken;
