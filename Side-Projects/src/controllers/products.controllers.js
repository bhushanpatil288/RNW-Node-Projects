const Product = require("../models/product.model.js");
const Category = require("../models/categories.model.js");
const AppError = require("../utils/AppError.js");

const productsPageController = async (req, res) => {
    const products = await Product.find().lean().populate("category");
    const categories = await Category.find().lean();

    if (!products.length) {
        const fallbackProducts = [
            {
                title: "Aurora Headphones",
                description: "Immersive sound with deep bass and all-day comfort.",
                price: 129,
                img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80"
            },
            {
                title: "Luna Smart Watch",
                description: "Track fitness goals and stay connected on the go.",
                price: 199,
                img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80"
            },
            {
                title: "Nova Backpack",
                description: "A durable daily bag designed for work, travel, and weekends.",
                price: 89,
                img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80"
            },
            {
                title: "Orbit Speaker",
                description: "Portable Bluetooth speaker with rich sound and long battery life.",
                price: 74,
                img: "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=900&q=80"
            }
        ];


        res.render("products", {
            products: fallbackProducts,
            categories: [],
            isLoggedIn: Boolean(req.user),
            user: req.user || null
        });
        return;
    }

    res.render("products", {
        products,
        categories,
        isLoggedIn: Boolean(req.user),
        user: req.user || null
    });
}

const addProductPageController = async (req, res) => {
    res.render("addProduct", {
        title: "Add Product",
        user: req.user || null
    });
}

const addProductController = async (req, res) => {
    const { title, description, price, category } = req.body;

    if (!title || !price || !req.file) {
        return res.redirect("/products/add");
    }

    const productImg = `/uploads/${req.file.filename}`;

    const categoryExists = await Category.findOne({ categoryTitle: category });

    if (!categoryExists) {
        const catRes = await Category.create({ categoryTitle: category });
        await Product.create({
            title,
            description,
            price: Number(price),
            productImg,
            category: catRes._id
        });
    } else {
        await Product.create({
            title,
            description,
            price: Number(price),
            productImg,
            category: categoryExists._id
        })
    }

    res.redirect("/products");
}

const removeProductController = async (req, res) => {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
        throw new AppError(404, "Product not found");
    }

    const imgLoc = product.productImg;
    const fs = require("fs/promises");
    const path = require("path");
    await fs.unlink(path.join(__dirname, "../public", imgLoc));

    await Product.findByIdAndDelete(id);

    res.json({
        success: true
    });
};

const categoryFilterController = async (req, res) => {
    const products = await Product.find({ category: req.params.id }).lean().populate("category");
    const categories = await Category.find().lean();
    res.render("products", {
        products,
        categories,
        isLoggedIn: Boolean(req.user),
        user: req.user || null
    })
};

const dashboardPageController = async (req, res) => {
    const products = await Product.find().lean().populate("category");
    const categories = await Category.find().lean();

    if (!products.length) {
        const fallbackProducts = [
            {
                title: "Aurora Headphones",
                description: "Immersive sound with deep bass and all-day comfort.",
                price: 129,
                img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80"
            },
            {
                title: "Luna Smart Watch",
                description: "Track fitness goals and stay connected on the go.",
                price: 199,
                img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80"
            },
            {
                title: "Nova Backpack",
                description: "A durable daily bag designed for work, travel, and weekends.",
                price: 89,
                img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80"
            },
            {
                title: "Orbit Speaker",
                description: "Portable Bluetooth speaker with rich sound and long battery life.",
                price: 74,
                img: "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=900&q=80"
            }
        ];


        res.render("products", {
            products: fallbackProducts,
            categories: [],
            isLoggedIn: Boolean(req.user),
            user: req.user || null
        });
        return;
    }

    res.render("dashboard", {
        products,
        categories,
        isLoggedIn: Boolean(req.user),
        user: req.user || null
    });
}

module.exports = {
    productsPageController,
    addProductPageController,
    addProductController,
    removeProductController,
    categoryFilterController,
    dashboardPageController
}
