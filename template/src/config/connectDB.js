const env = require("../config/env.js");
const mongoose = require("mongoose");

module.exports = async () => {
    try {
        const res = await mongoose.connect(env.MONGO_URI);
        console.log(`\n🌐 Connected to Database: ${res.connection.name}`);
    } catch (e) {
        throw new Error(`❌ Failed to connect to db`) 
    }
};
