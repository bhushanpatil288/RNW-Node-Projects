const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

const getAuthenticatedUser = async (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        req.user = null;
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("username email role");
        req.user = user;
        return next();
    } catch (error) {
        res.clearCookie("token");
        req.user = null;
        return next();
    }
};

const requireGuest = (req, res, next) => {
    console.log(req.user)
    if (req.user) {
        return res.redirect("/");
    }
    return next();
};

const requireAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect("/login");
    }
    return next();
};

module.exports = {
    getAuthenticatedUser,
    requireGuest,
    requireAuth,
};
