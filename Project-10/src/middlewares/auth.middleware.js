const jwt = require('jsonwebtoken');
const env = require('../config/environment');
const ApiError = require('../utils/apiError');
const catchAsync = require('../utils/catchAsync');

/**
 * Middleware to verify JWT tokens and protect routes.
 */
const authenticate = catchAsync(async (req, res, next) => {
  // 1) Get token from Authorization header
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw ApiError.unauthorized('Access denied. No token provided.');
  }

  // 2) Verify token
  try {
    const decoded = jwt.verify(token, env.jwt.secret);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw ApiError.unauthorized('Token has expired. Please login again.');
    }
    if (error.name === 'JsonWebTokenError') {
      throw ApiError.unauthorized('Invalid token.');
    }
    throw ApiError.unauthorized('Authentication failed.');
  }
});

/**
 * Middleware to check if the authenticated user is active.
 */
const requireActive = (req, res, next) => {
  if (!req.user || !req.user.active) {
    throw ApiError.forbidden('Account is deactivated.');
  }
  next();
};

/**
 * Generate JWT access token
 * @param {object} payload - Token payload
 * @returns {string} JWT token
 */
const generateAccessToken = (payload) => {
  return jwt.sign(payload, env.jwt.secret, {
    expiresIn: env.jwt.expiresIn,
  });
};

/**
 * Generate JWT refresh token
 * @param {object} payload - Token payload
 * @returns {string} JWT refresh token
 */
const generateRefreshToken = (payload) => {
  return jwt.sign(payload, env.jwt.refreshSecret, {
    expiresIn: env.jwt.refreshExpiresIn,
  });
};

module.exports = {
  authenticate,
  requireActive,
  generateAccessToken,
  generateRefreshToken,
};
