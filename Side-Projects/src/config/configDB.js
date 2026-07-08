const mongoose = require("mongoose");
const configEnv = require("./configEnv.js");

const connectDB = async () => {
    try {
        const res = await mongoose.connect(configEnv.MONGO_URI);
        console.log(`✅ Connected to DB: ${res.connection.name}`);
    } catch (err) {
        console.log("❌ Failed to connect DB")
    }
};

module.exports = connectDB;
