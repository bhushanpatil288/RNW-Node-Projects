require("dotenv").config();

if (!process.env.PORT) {
    throw new Error("Missing PORT in environmental variables");
};

if (!process.env.BASE_URL) {
    throw new Error("Missing BASE_URL  in environmental variables");
};

if (!process.env.MONGO_URI) {
    throw new Error("Missing MONGO_URI in environmental variables");
};

const envConfig = {
    PORT: process.env.PORT,
    BASE_URL: process.env.BASE_URL,
    MONGO_URI: process.env.MONGO_URI
};

module.exports = envConfig;