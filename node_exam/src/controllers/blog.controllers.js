const Article = require("../models/article.model.js");

const getArticles = async () => {
    try {
        return await Article.find().populate("author", "username").sort({ createdAt: -1 });
    } catch (error) {
        return [];
    }
};

const createPost = async (req, res) => {
    const { title, content } = req.body;

    if (!req.user) {
        return res.redirect("/login");
    }

    if (!title || !content) {
        const articles = await getArticles();
        return res.status(400).render("index", {
            user: req.user,
            articles,
            error: "Title and content are required.",
            success: null,
        });
    }

    await Article.create({
        title,
        content,
        author: req.user._id,
    });

    req.session.flash = { type: "success", message: "Post created successfully." };

    return res.redirect("/");
};

const updatePost = async (req, res) => {
    if (!req.user) {
        return res.redirect("/login");
    }

    const { title, content } = req.body;
    const article = await Article.findById(req.params.id);

    if (!article || String(article.author) !== String(req.user._id)) {
        return res.redirect("/");
    }

    if (!title || !content) {
        return res.redirect("/");
    }

    article.title = title;
    article.content = content;
    await article.save();

    return res.redirect("/");
};

const deletePost = async (req, res) => {
    if (!req.user) {
        return res.redirect("/login");
    }

    const article = await Article.findById(req.params.id);

    if (!article || String(article.author) !== String(req.user._id)) {
        return res.redirect("/");
    }

    await Article.findByIdAndDelete(req.params.id);

    return res.redirect("/");
};

module.exports = {
    createPost,
    updatePost,
    deletePost,
    getArticles,
};