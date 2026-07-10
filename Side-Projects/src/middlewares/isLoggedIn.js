const decryptToken = require("../utils/decryptToken.js");
const AppError = require("../utils/AppError.js");

const isLoggedIn = (req, res, next) => {
    console.log(req.cookies)
    const token = req.cookies.token;
    const result = decryptToken(token);
    
    if (!result) {
        next();
    }

    req.user = result;
    next();
}

module.exports = isLoggedIn;