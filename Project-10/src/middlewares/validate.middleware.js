const ApiError = require('../utils/apiError');

/**
 * Middleware factory to validate request data against a Joi schema.
 *
 * @param {object} schema - Joi validation schema object with optional keys: body, query, params
 * @returns {Function} Express middleware
 *
 * @example
 * router.post('/', validate({ body: createActorSchema }), controller.create);
 */
const validate = (schema) => (req, res, next) => {
  const validationErrors = [];

  // Validate each part of the request (body, query, params)
  ['body', 'query', 'params'].forEach((property) => {
    if (schema[property]) {
      const { error, value } = schema[property].validate(req[property], {
        abortEarly: false, // Return all errors, not just the first
        stripUnknown: true, // Remove unknown fields
        allowUnknown: false,
      });

      if (error) {
        const details = error.details.map((detail) => ({
          field: detail.path.join('.'),
          message: detail.message.replace(/['"]/g, ''),
        }));
        validationErrors.push(...details);
      } else {
        // Replace request data with validated & sanitized data
        req[property] = value;
      }
    }
  });

  if (validationErrors.length > 0) {
    const message = validationErrors.map((e) => e.message).join('; ');
    return next(new ApiError(400, `Validation error: ${message}`));
  }

  return next();
};

module.exports = validate;
