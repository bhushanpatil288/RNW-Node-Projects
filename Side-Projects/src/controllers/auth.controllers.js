const AppError = require("../utils/AppError.js");
const genToken = require("../utils/genToken.js");
const decryptToken = require("../utils/decryptToken.js");
const Users = require("../models/user.model.js");

const setTokenCookie = (res, token) => {
    res.cookie("token", token, {
        httpOnly: true,
        secure: false, // true in production with HTTPS
        sameSite: "lax",
    });
    return;
}

const registerPageController = (req, res) => {
    if (req.user?.id) {
        return res.redirect("/products");
    } else {
        res.render("register");
    }
}

const registerController = async (req, res) => {
    if (req.user) {
        return res.redirect("/products");
    }

    const { username, email, password } = req.body;

    // checks
    if ([username, email, password].some(field => field.trim() === "")) {
        throw new AppError(400, "All the fields are required");
    }

    const userExists = await Users.findOne({ email })

    if (userExists) {
        throw new AppError(404, "Email not available");
    }

    const user = await Users.create({ username, email, password });

    const token = genToken({ id: user._id });
    setTokenCookie(res, token);

    return res.redirect("/products");
}

module.exports = {
    registerPageController,
    registerController
}
