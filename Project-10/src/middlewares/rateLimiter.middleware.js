const rateLimit = require('express-rate-limit');
const env = require('../config/environment');

/**
 * General API rate limiter.
 * Default: 100 requests per 15 minutes per IP.
 */
const apiLimiter = rateLimit({
  windowMs: env.rateLimit.windowMs,
  max: env.rateLimit.max,
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
  },
});

/**
 * Stricter rate limiter for authentication routes.
 * Default: 5 requests per 15 minutes per IP.
 */
const authLimiter = rateLimit({
  windowMs: env.rateLimit.windowMs,
  max: env.rateLimit.authMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login attempts, please try again later.',
  },
});

module.exports = { apiLimiter, authLimiter };
