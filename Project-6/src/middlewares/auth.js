const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/userModel");

const requireAuth = asyncHandler(async (req, res, next) => {
    const { id } = req.cookies || {};

    if (!id) {
        return res.redirect("/auth/signin");
    }

    const user = await User.findById(id);

    if (!user) {
        return res.redirect("/auth/signin");
    }

    req.user = user;
    return next();
});

module.exports = requireAuth;
