const winston = require('winston');
const path = require('path');
require('winston-daily-rotate-file');

// Determine log settings from env (can't import environment.js here to avoid circular deps)
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
const LOG_DIR = process.env.LOG_DIR || 'logs';
const NODE_ENV = process.env.NODE_ENV || 'development';

// Custom log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
    let log = `${timestamp} [${level.toUpperCase()}]: ${message}`;
    if (stack) {
      log += `\n${stack}`;
    }
    if (Object.keys(meta).length > 0) {
      log += ` ${JSON.stringify(meta)}`;
    }
    return log;
  })
);

// JSON format for production
const jsonFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

// Transports
const transports = [];

// Console transport
if (NODE_ENV === 'development') {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), logFormat),
    })
  );
} else {
  transports.push(
    new winston.transports.Console({
      format: jsonFormat,
    })
  );
}

// File transports (daily rotation)
const logDir = path.resolve(LOG_DIR);

transports.push(
  new winston.transports.DailyRotateFile({
    filename: path.join(logDir, 'app-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    maxFiles: '14d',
    format: jsonFormat,
  })
);

transports.push(
  new winston.transports.DailyRotateFile({
    filename: path.join(logDir, 'error-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    maxFiles: '30d',
    level: 'error',
    format: jsonFormat,
  })
);

// Create logger
const logger = winston.createLogger({
  level: LOG_LEVEL,
  transports,
  exitOnError: false,
});

// Morgan stream for HTTP request logging
logger.stream = {
  write: (message) => {
    logger.info(message.trim());
  },
};

module.exports = logger;
