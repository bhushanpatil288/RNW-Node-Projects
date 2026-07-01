const User = require("../models/user");
const asyncHandler = require("../utils/asyncHandler");

const showLoginPage = (req, res) => {
    res.render("login");
};

const showSignupPage = (req, res) => {
    res.render("signup");
};

const registerUser = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).render("signup", {
            error: "Please fill in all required fields",
            username,
            email
        });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).render("signup", {
            error: "Please enter a valid email address",
            username,
            email
        });
    }

    if (password.length < 6) {
        return res.status(400).render("signup", {
            error: "Password must be at least 6 characters long",
            username,
            email
        });
    }

    // Check for existing username or email
    const existingUser = await User.findOne({
        $or: [
            { email: email.toLowerCase() },
            { username: username.toLowerCase() }
        ]
    });

    if (existingUser) {
        return res.status(400).render("signup", {
            error: "Username or Email already registered",
            username,
            email
        });
    }

    // Create user (password hashed in pre-save hook)
    const newUser = await User.create({
        username: username.trim(),
        email: email.trim().toLowerCase(),
        password: password
    });

    // Auto login
    req.login(newUser, (err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", `Welcome to Cinema, ${newUser.username}!`);
        res.redirect("/");
    });
});

const logoutUser = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You have successfully logged out");
        res.redirect("/login");
    });
};

module.exports = {
    showLoginPage,
    showSignupPage,
    registerUser,
    logoutUser
};
