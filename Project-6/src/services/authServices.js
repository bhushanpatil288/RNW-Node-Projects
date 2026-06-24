const User = require("../models/userModel");

const signupService = async (req, res) => {
    let { username, email, password } = req.body;

    if ([ username, email, password ].some(e => e.trim() === "")) {
        return false;
    };

    const result = await User.create({
        username,
        email,
        password
    });

    return result;
}

module.exports = {
    signupService
}