const configEnv = require("../config/configEnv.js");

module.exports = (err, req, res, next) => {
    res.status(err.statusCode || 500).render("error", {
        title: err.status || "Error",
        status: err.statusCode || 500,
        message: err.message || "Something went wrong.",
        stack: configEnv.NODE_ENV === "development"
            ? err.stack
            : null
    });
};