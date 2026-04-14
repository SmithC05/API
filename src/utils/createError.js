const createError = (statusCode, message, errorText) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.error = errorText;
  return error;
};

module.exports = createError;
