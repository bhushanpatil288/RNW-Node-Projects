const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const Article = require("../models/article.model.js");

const getAuthenticatedUser = async (req, res) => {
    const token = req.cookies?.token;

    if (!token) {
        return null;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("username email role");
        return user;
    } catch (error) {
        res.clearCookie("token");
        return null;
    }
};

const homePage = async (req, res) => {
    const user = await getAuthenticatedUser(req, res);

    let articles = [];
    try {
        articles = await Article.find().populate("author", "username").sort({ createdAt: -1 });
    } catch (error) {
        articles = [];
    }

    const flashMessage = req.session?.flash;
    if (req.session) {
        delete req.session.flash;
    }

    return res.status(200).render("index", {
        user,
        articles,
        error: flashMessage?.type === "error" ? flashMessage.message : null,
        success: flashMessage?.type === "success" ? flashMessage.message : null,
    });
};

const registerPage = (req, res) => {
    return res.status(200).render("register", { user: null, error: null, success: null });
};

const loginPage = (req, res) => {
    res.status(200).render("login", { user: null, error: null, success: null });
}

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).render("register", {
            error: "All fields are required.",
            success: null,
        });
    }

    const existingUser = await User.findOne({
        $or: [{ email }, { username }],
    });

    if (existingUser) {
        return res.status(409).render("register", {
            user: req.user || null,
            error: "User with that email or username already exists.",
            success: null,
        });
    }

    const newUser = await User.create({ username, email, password });

    const token = jwt.sign(
        { id: newUser._id, role: newUser.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.cookie("token", token.toString(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

    let articles = [];
    try {
        articles = await Article.find().populate("author", "username").sort({ createdAt: -1 });
    } catch (error) {
        articles = [];
    }

    return res.status(201).render("index", {
        user: newUser,
        articles,
        error: null,
        success: `Welcome ${newUser.username}! Your account has been created.`,
    });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).render("login", {
            error: "Email and password are required.",
            success: null,
        });
    };

    const user = await User.findOne({ email });

    console.log("user: ", user)
    
    if (!user) {
        return res.status(401).render("login", {
            error: "Invalid email or password.",
            success: null,
        });
    }

    const isPasswordValid = await user.comparePassword(password);

    console.log("isPasswordValid: ", isPasswordValid)

    if (!isPasswordValid) {
        return res.status(401).render("login", {
            error: "Invalid email or password.",
            success: null,
        });
    }

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.cookie("token", token.toString(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

    let articles = [];
    try {
        articles = await Article.find().populate("author", "username").sort({ createdAt: -1 });
    } catch (error) {
        articles = [];
    }

    return res.status(200).render("index", {
        user,
        articles,
        error: null,
        success: `Welcome back ${user.username}! You have successfully logged in.`,
    })
}

const logoutUser = (req, res) => {
    res.clearCookie("token");
    return res.redirect("/");
};

module.exports = {
    homePage,
    registerPage,
    registerUser,
    loginPage,
    loginUser,
    logoutUser,
};