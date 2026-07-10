const decryptToken = require("../utils/decryptToken.js");
const AppError = require("../utils/AppError.js");

const authMiddleware = (req, res, next) => {
    console.log(req.cookies)
    const token = req.cookies.token;
    const result = decryptToken(token);

    console.log(result)
    
    if (!result) {
        res.redirect("/auth/login");
    }

    req.user = result;
    next();
}

module.exports = authMiddleware;