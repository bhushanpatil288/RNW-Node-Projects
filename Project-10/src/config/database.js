const mongoose = require('mongoose');
const env = require('./environment');
const logger = require('./logger');

/**
 * Connect to MongoDB
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.mongo.uri);
    logger.info(`✅ MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    logger.error('❌ Unable to connect to MongoDB:', error.message);
    process.exit(1);
  }
};

/**
 * Disconnect from MongoDB
 */
const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    logger.info('MongoDB connection closed.');
  } catch (error) {
    logger.error('Error closing MongoDB connection:', error);
  }
};

// Handle connection events
mongoose.connection.on('error', (err) => {
  logger.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  logger.warn('MongoDB disconnected.');
});

module.exports = { connectDB, disconnectDB };
