const indexPage = async (req, res) => {
    const articles = await Article.find().populate("author", "username").sort({ createdAt: -1 });
    res.status(200).render("index", { articles });
}

module.exports = {
    indexPage
}