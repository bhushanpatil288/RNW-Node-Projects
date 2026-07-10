const jwt = require("jsonwebtoken");
const configEnv = require("../config/configEnv");

const decryptToken = (token) => {
    try {
        return jwt.verify(token, configEnv.JWT_SECRET);
    } catch (err) {
        return false;
    }
}

module.exports = decryptToken;