const Blogs = require("../models/blog");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

const indexPage = asyncHandler(async (req, res) => {
    const blogs = await Blogs.find().populate("user").sort({ createdAt: -1 });
    res.render("index", { blogs });
});

const showAddPage = (req, res) => {
    res.render("add");
};

const createBlog = asyncHandler(async (req, res) => {
    const { title, author, readTime, category, content } = req.body;

    if (!title || !author || !readTime || !category || !content) {
        return res.status(400).render("add", {
            error: "Please fill in all required fields (Title, Author, Read Time, Category, Content)"
        });
    }

    if (!req.file) {
        return res.status(400).render("add", {
            error: "Please upload a blog image"
        });
    }

    const blogData = {
        title: title.trim(),
        author: author.trim(),
        readTime: parseInt(readTime),
        category: category.trim(),
        content: content.trim(),
        image: `/uploads/${req.file.filename}`,
        user: req.user._id
    };

    await Blogs.create(blogData);

    res.redirect("/");
});

const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const blog = await Blogs.findById(id);
    if (!blog) {
        throw new ApiError(404, "Blog not found");
    }

    const { image } = blog;
    if (image) {
        const fs = require("fs");
        const path = require("path");
        const imagePath = path.join(__dirname, "..", "public", image);
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error("Error deleting blog image:", err);
            }
        });
    }
    await Blogs.findByIdAndDelete(id);
    res.redirect("/");
});

const showEditPage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const blog = await Blogs.findById(id);
    if (!blog) {
        throw new ApiError(404, "Blog not found");
    }
    res.render("edit", {
        id: blog._id,
        title: blog.title,
        author: blog.author,
        readTime: blog.readTime,
        category: blog.category,
        content: blog.content
    });
});

const editBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, author, readTime, category, content } = req.body;

    if (!title || !author || !readTime || !category || !content) {
        return res.status(400).render("edit", {
            error: "Please fill in all required fields (Title, Author, Read Time, Category, Content)",
            id,
            title,
            author,
            readTime,
            category,
            content
        });
    }

    const blogData = {
        title: title.trim(),
        author: author.trim(),
        readTime: parseInt(readTime),
        category: category.trim(),
        content: content.trim()
    };

    if (req.file) {
        blogData.image = `/uploads/${req.file.filename}`;
    }

    const oldBlogData = await Blogs.findById(id);

    if (req.file && oldBlogData) {
        const { image } = oldBlogData;
        if (image) {
            const fs = require("fs");
            const path = require("path");
            const imagePath = path.join(__dirname, "..", "public", image);
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error("Error deleting blog image:", err);
                }
            });
        }
    }

    const blog = await Blogs.findByIdAndUpdate(id, blogData, { new: true });
    if (!blog) {
        throw new ApiError(404, "Blog not found");
    }

    res.redirect("/");
});

module.exports = {
    indexPage,
    showAddPage,
    createBlog,
    deleteBlog,
    showEditPage,
    editBlog
};