const mongoose = require('mongoose');
const ApiError = require('../utils/apiError');
const logger = require('../config/logger');
const env = require('../config/environment');

/**
 * Convert Mongoose errors into ApiError instances.
 */
const convertMongooseError = (err) => {
  // Mongoose validation error
  if (err instanceof mongoose.Error.ValidationError) {
    const messages = Object.values(err.errors).map((e) => e.message);
    return new ApiError(400, `Validation error: ${messages.join(', ')}`);
  }

  // Mongoose cast error (invalid ObjectId, etc.)
  if (err instanceof mongoose.Error.CastError) {
    return new ApiError(400, `Invalid ${err.path}: ${err.value}`);
  }

  // MongoDB duplicate key error
  if (err.code === 11000) {
    const fields = Object.keys(err.keyValue).join(', ');
    return new ApiError(409, `Duplicate value for: ${fields}`);
  }

  return null;
};

/**
 * Global error handling middleware.
 * Must have 4 parameters (err, req, res, next) for Express to recognize it.
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // Convert Mongoose errors
  const mongooseError = convertMongooseError(err);
  if (mongooseError) {
    err = mongooseError;
  }

  // Default values
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  err.message = err.message || 'Internal Server Error';

  // Log the error
  if (err.statusCode >= 500) {
    logger.error('Server Error:', {
      message: err.message,
      stack: err.stack,
      url: req.originalUrl,
      method: req.method,
      ip: req.ip,
    });
  } else {
    logger.warn('Client Error:', {
      message: err.message,
      statusCode: err.statusCode,
      url: req.originalUrl,
      method: req.method,
    });
  }

  // Send response
  const response = {
    success: false,
    status: err.status,
    message: err.message,
  };

  // Include stack trace in development
  if (env.nodeEnv === 'development') {
    response.stack = err.stack;
  }

  res.status(err.statusCode).json(response);
};

/**
 * Handle 404 - Route not found
 */
const notFound = (req, res, next) => {
  next(ApiError.notFound(`Route ${req.originalUrl} not found`));
};

module.exports = { errorHandler, notFound };
