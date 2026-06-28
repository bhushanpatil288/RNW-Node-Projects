const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    logger.error(err.message);

    const data = {
        success: false,
        message: err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    }

    res.status(statusCode).render("errorPage", data);
}

module.exports = errorHandler;