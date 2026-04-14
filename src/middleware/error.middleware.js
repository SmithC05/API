const errorMiddleware = (err, req, res, next) => {
  console.error('Error:', err.message);

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Server error';
  let errorMessage = err.error || 'Something went wrong';

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Bad input';
    errorMessage = Object.values(err.errors)[0].message;
  }

  if (err.code === 11000) {
    statusCode = 400;
    message = 'Bad input';
    errorMessage = 'Email already exists';
  }

  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Unauthorized';
    errorMessage = 'Token is invalid';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Unauthorized';
    errorMessage = 'Token has expired';
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    error: errorMessage
  });
};

module.exports = errorMiddleware;
