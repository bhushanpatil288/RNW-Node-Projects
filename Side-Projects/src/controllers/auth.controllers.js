const AppError = require("../utils/AppError.js");
const genToken = require("../utils/genToken.js");
const decryptToken = require("../utils/decryptToken.js");
const Users = require("../models/user.model.js");
const bcrypt = require("bcrypt");

// helper functions

const setTokenCookie = (res, token) => {
    res.cookie("token", token, {
        httpOnly: true,
        secure: false, // true in production with HTTPS
        sameSite: "lax",
    });
    return;
}

const isPasswordMatch = (enteredPassword, originalPassword) => {
    return bcrypt.compare(enteredPassword, originalPassword);
}


// controllers

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

const loginPageController = (req, res) => {
    if (req.user?.id) {
        return res.redirect("/products");
    } else {
        res.render("login");
    }
}

const loginController = async (req, res) => {
    if (req.user) {
        return res.redirect("/products");
    }

    console.log(req.body)

    const { usernameOrEmail, password } = req.body;


    if ([ usernameOrEmail, password].some(field => field.trim() === "")) {
        throw new AppError(404, "All the fields are required");
    }

    const user = await Users.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]});

    if (!user) {
        throw new AppError(404, "User not found");
    }

    const isMatch = await isPasswordMatch(password, user.password);

    if (!isMatch) {
        throw new AppError(401, "Invalid Credentials");
    }

    const token = genToken({id: user._id});
    setTokenCookie(res, token);

    res.redirect("/products");
}

module.exports = {
    registerPageController,
    registerController,
    loginPageController,
    loginController
}
