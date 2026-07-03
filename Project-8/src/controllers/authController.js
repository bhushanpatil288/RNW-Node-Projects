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
        req.flash("success", `Welcome to BlogHub, ${newUser.username}!`);
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

const showProfilePage = (req, res) => {
    res.render("profile");
};

const changePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
        return res.status(400).render("profile", {
            error: "Please fill in all required fields"
        });
    }

    if (newPassword.length < 6) {
        return res.status(400).render("profile", {
            error: "New password must be at least 6 characters long"
        });
    }

    if (newPassword !== confirmPassword) {
        return res.status(400).render("profile", {
            error: "New passwords do not match"
        });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
        return res.status(404).render("profile", {
            error: "User not found"
        });
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
        return res.status(400).render("profile", {
            error: "Incorrect current password"
        });
    }

    user.password = newPassword;
    await user.save();

    req.flash("success", "Password updated successfully!");
    res.redirect("/profile");
});

const showForgotPasswordPage = (req, res) => {
    res.render("forgotPassword");
};

const handleForgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).render("forgotPassword", {
            error: "Please enter your email address"
        });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
        return res.status(400).render("forgotPassword", {
            error: "No account found with that email address"
        });
    }

    req.session.resetEmail = user.email;
    req.session.otpVerified = false;

    req.flash("success", "OTP sent successfully! (Static OTP: 1234)");
    res.redirect("/verify-otp");
});

const showVerifyOtpPage = (req, res) => {
    if (!req.session.resetEmail) {
        req.flash("error", "Please request a password reset first");
        return res.redirect("/forgot-password");
    }
    res.render("verifyOtp", { staticOtp: "1234" });
};

const handleVerifyOtp = asyncHandler(async (req, res) => {
    const { otp } = req.body;
    if (!req.session.resetEmail) {
        req.flash("error", "Session expired. Please start over.");
        return res.redirect("/forgot-password");
    }

    if (!otp) {
        return res.status(400).render("verifyOtp", {
            error: "Please enter the OTP",
            staticOtp: "1234"
        });
    }

    if (otp !== "1234") {
        return res.status(400).render("verifyOtp", {
            error: "Invalid OTP. Please try again.",
            staticOtp: "1234"
        });
    }

    req.session.otpVerified = true;
    res.redirect("/reset-password");
});

const showResetPasswordPage = (req, res) => {
    if (!req.session.resetEmail || !req.session.otpVerified) {
        req.flash("error", "Please verify your OTP first");
        return res.redirect("/forgot-password");
    }
    res.render("resetPassword");
};

const handleResetPassword = asyncHandler(async (req, res) => {
    const { password, confirmPassword } = req.body;
    if (!req.session.resetEmail || !req.session.otpVerified) {
        req.flash("error", "Session expired or invalid. Please start over.");
        return res.redirect("/forgot-password");
    }

    if (!password || !confirmPassword) {
        return res.status(400).render("resetPassword", {
            error: "Please fill in all required fields"
        });
    }

    if (password.length < 6) {
        return res.status(400).render("resetPassword", {
            error: "Password must be at least 6 characters long"
        });
    }

    if (password !== confirmPassword) {
        return res.status(400).render("resetPassword", {
            error: "Passwords do not match"
        });
    }

    const user = await User.findOne({ email: req.session.resetEmail });
    if (!user) {
        req.flash("error", "User not found. Please try again.");
        delete req.session.resetEmail;
        delete req.session.otpVerified;
        return res.redirect("/forgot-password");
    }

    user.password = password;
    await user.save();

    delete req.session.resetEmail;
    delete req.session.otpVerified;

    req.flash("success", "Password reset successful! You can now log in.");
    res.redirect("/login");
});

module.exports = {
    showLoginPage,
    showSignupPage,
    registerUser,
    logoutUser,
    showProfilePage,
    changePassword,
    showForgotPasswordPage,
    handleForgotPassword,
    showVerifyOtpPage,
    handleVerifyOtp,
    showResetPasswordPage,
    handleResetPassword
};
