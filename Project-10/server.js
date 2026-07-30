const app = require('./src/app');
const env = require('./src/config/environment');
const logger = require('./src/config/logger');
const { connectDB, disconnectDB } = require('./src/config/database');

// Import models to register schemas
require('./src/models');

const PORT = env.port;

/**
 * Start the server
 */
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start listening
    const server = app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT} in ${env.nodeEnv} mode`);
      logger.info(`📚 API Docs available at http://localhost:${PORT}/api-docs`);
      logger.info(`❤️  Health check at http://localhost:${PORT}/health`);
    });

    // Graceful shutdown
    const gracefulShutdown = (signal) => {
      logger.info(`\n${signal} received. Starting graceful shutdown...`);

      server.close(async () => {
        logger.info('HTTP server closed.');

        try {
          await disconnectDB();
        } catch (err) {
          logger.error('Error closing database connection:', err);
        }

        process.exit(0);
      });

      // Force shutdown after 10 seconds
      setTimeout(() => {
        logger.error('Forced shutdown due to timeout.');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason, promise) => {
      logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (error) => {
      logger.error('Uncaught Exception:', error);
      process.exit(1);
    });
  } catch (error) {
    logger.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
