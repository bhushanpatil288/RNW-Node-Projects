const decryptToken = require("../utils/decryptToken.js");
const AppError = require("../utils/AppError.js");

const protected = (req, res, next) => {
    const token = req.cookies.token;
    const result = decryptToken(token);
    
    if (!result) {
        res.redirect("/auth/login");
    }

    req.user = result;
    next();
}

module.exports = protected;