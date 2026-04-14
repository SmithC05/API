const createError = require('../utils/createError');

const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: true,
      stripUnknown: true
    });

    if (error) {
      return next(createError(400, 'Bad input', error.details[0].message));
    }

    // Save the cleaned values back into req.body.
    req.body = value;
    return next();
  };
};

module.exports = validate;
