const mongoose = require("mongoose");
const logger = require("../utils/logger");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info("✅ Connected to MongoDB");
  } catch (err) {
    logger.error("❌ Failed to connect MongoDB", err.message);
  }
}

module.exports = connectDB;