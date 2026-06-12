exports.errorHandler = (err, req, res, next) => {
    console.log(`Error Test route hit : ${err.message}`);

    const statusCode = err.statusCode || 500;

    const data = {
        success: false,
        message: err.message || "Internal Server error",
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    }

    res.render("others/errorPage", data);
};