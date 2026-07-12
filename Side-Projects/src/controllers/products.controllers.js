const Product = require("../models/product.model.js");

const productsPageController = async (req, res) => {
    const products = await Product.find().lean();

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
            isLoggedIn: Boolean(req.user)
        });
        return;
    }

    res.render("products", {
        products,
        isLoggedIn: Boolean(req.user)
    });
}

const addProductPageController = async (req, res) => {
    res.render("addProduct", {
        title: "Add Product"
    });
}

const addProductController = async (req, res) => {
    const { title, description, price } = req.body;

    if (!title || !price || !req.file) {
        return res.redirect("/products/add");
    }

    const productImg = `/uploads/${req.file.filename}`;

    await Product.create({
        title,
        description,
        price: Number(price),
        productImg
    });

    res.redirect("/products");
}

module.exports = {
    productsPageController,
    addProductPageController,
    addProductController
}
