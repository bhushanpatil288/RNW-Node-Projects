require("dotenv").config();

const required = ["PORT", "BASE_URL", "MONGO_URI", "NODE_ENV", "JWT_SECRET"];

for (const key of required) {
    if (!process.env[key]) {
        throw new Error (`Missing ${key} in environment variables`);
    }
};

const envConfig = {
    PORT: Number(process.env.PORT),
    BASE_URL: process.env.BASE_URL,
    MONGO_URI: process.env.MONGO_URI,
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET,
    SMTP_HOST: process.env.SMTP_HOST || "",
    SMTP_PORT: Number(process.env.SMTP_PORT) || 587,
    SMTP_USER: process.env.SMTP_USER || "",
    SMTP_PASS: process.env.SMTP_PASS || ""
};

module.exports = envConfig;