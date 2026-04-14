const requestLogger = (req, res, next) => {
  // Basic request logging using console.log as requested.
  console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
  next();
};

module.exports = requestLogger;
