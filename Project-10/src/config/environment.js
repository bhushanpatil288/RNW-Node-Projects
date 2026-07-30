const dotenv = require('dotenv');
const path = require('path');

// Load .env file
dotenv.config({ path: path.join(__dirname, '../../.env') });

const environment = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
  mongo: {
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017/dvd_rental',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 900000,
    max: parseInt(process.env.RATE_LIMIT_MAX, 10) || 100,
    authMax: parseInt(process.env.AUTH_RATE_LIMIT_MAX, 10) || 5,
  },
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    dir: process.env.LOG_DIR || 'logs',
  },
};

// Validate required environment variables in production
const requiredEnvVars = ['JWT_SECRET', 'JWT_REFRESH_SECRET'];

if (environment.nodeEnv === 'production') {
  const missing = requiredEnvVars.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    );
  }
}

module.exports = environment;
