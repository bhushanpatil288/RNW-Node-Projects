const ApiError = require('../utils/ApiError');
const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors,
        });
    }

    logger.error(err.message || 'Unhandled error', { stack: err.stack });

    return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
    });
};

module.exports = errorHandler;
