const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("Connected to database ✅")
    } catch (e) {
        console.log("Failed to connect ❌", e)
    }
}

module.exports = connectDB;