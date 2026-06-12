const winston = require("winston");

const isDev = process.env.NODE_ENV !== "production";

const consoleFormat = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }),
    isDev ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.printf(({ level, message, timestamp, stack }) => {
        return `${timestamp} [${level}] ${stack || message}`;
    })
);

const fileFormat = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }),
    winston.format.uncolorize(),
    winston.format.printf(({ level, message, timestamp, stack }) => {
        return `${timestamp} [${level}] ${stack || message}`;
    })
);

const logger = winston.createLogger({
    level: "info",
    transports: [
        new winston.transports.Console({ format: consoleFormat }),
        new winston.transports.File({ filename: "logs/error.log", level: "error", format: fileFormat }),
        new winston.transports.File({ filename: "logs/combined.log", format: fileFormat }),
    ],
});

module.exports = logger;