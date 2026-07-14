const AppError = require("../utils/AppError.js");
const genToken = require("../utils/genToken.js");
const decryptToken = require("../utils/decryptToken.js");
const Users = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const otpGen = require("otp-generator");

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

const getAuthenticatedUserId = (req) => {
    const token = req.cookies?.token;
    if (!token) return null;
    const ddata = decryptToken(token);
    return ddata?.id || null;
}

const generateOtp = () => otpGen.generate(4, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false, digits: true });

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

const resetPasswordPageController = async (req, res) => {
    const userId = getAuthenticatedUserId(req);
    const user = await Users.findById(userId);
    if (!user?.otp || !user?.candidatePassword) {
        res.redirect("/user/profile")
        return;
    }
    res.render("resetPassword");
}

const resetPasswordController = async (req, res) => {
    const { passwordOld, passwordNew, passwordConfirm } = req.body;

    if ([passwordOld, passwordNew, passwordConfirm].some(field => field.trim() === "")) {
        throw new AppError(400, "All the fields are required");
    };

    const userId = getAuthenticatedUserId(req);

    if (!userId) {
        throw new AppError(404, "Token not found");
    };

    const user = await Users.findById(userId);

    if (!user) {
        throw new AppError(404, "User not found");
    };

    const isSamePassword = await user.comparePassword(passwordNew);

    if (isSamePassword) {
        throw new AppError(400, "New password must be different from the current password");
    };

    const isMatch = await user.comparePassword(passwordOld, user.password);

    if (!isMatch) {
        throw new AppError(400, "Entered current password is incorrect");
    };

    if (passwordNew !== passwordConfirm) {
        throw new AppError(400, "New password and confirm passwords are not matching");
    };

    user.otp = generateOtp();
    user.candidatePassword = passwordNew;

    console.log(`OTP: ${user.otp}`);

    await user.save();

    res.redirect("/auth/reset-password");
}

const verifyOtp = async (req, res) => {
    const { otp } = req.body;

    if (!otp) {
        throw new AppError(400, "OTP is required");
    };

    const userId = getAuthenticatedUserId(req);
    if (!userId) {
        throw new AppError(404, "Token not found");
    }

    const user = await Users.findById(userId);

    if (!user?.otp || !user?.candidatePassword) {
        throw new AppError(409, "Bad request");
    };

    if (Number(user.otp) !== Number(otp)) {
        user.candidatePassword = null;
        user.otp = null;
        await user.save();
        throw new AppError(400, "Entered wrong otp");
    };

    user.password = user.candidatePassword;
    user.candidatePassword = null;
    user.otp = null;

    await user.save();

    res.redirect("/user/profile");
}

module.exports = {
    registerPageController,
    registerController,
    loginPageController,
    loginController,
    resetPasswordPageController,
    resetPasswordController,
    verifyOtp
}
