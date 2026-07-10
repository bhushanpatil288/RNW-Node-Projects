const jwt = require("jsonwebtoken");
const configEnv = require("../config/configEnv.js");

const genToken = (infoObj) => {
    return jwt.sign(
        infoObj,
        configEnv.JWT_SECRET,
        { expiresIn: "1d" }
    )
}

module.exports = genToken;