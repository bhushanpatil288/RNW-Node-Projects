require("dotenv").config();

const required = ["PORT", "BASE_URL", "MONGO_URI", "NODE_ENV"];

for (const key of required) {
    if (!process.env[key]) {
        throw new Error (`Missing ${key} in environment variables`);
    }
};

const envConfig = {
    PORT: Number(process.env.PORT),
    BASE_URL: process.env.BASE_URL,
    MONGO_URI: process.env.MONGO_URI,
    NODE_ENV: process.env.NODE_ENV
};

module.exports = envConfig;