const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log("✅ Connected to mongo-db successfully")
    } catch (e) {
        console.log("❌ Failed during mongo-db connection");
    }
}

module.exports = connectDB;