const env = require("./src/config/env.js");
const app = require("./src/app.js");
const connectDB = require("./src/config/connectDB.js");
const logger = require("./src/utils/logger");

connectDB()
    .then(() => {
        app.listen(env.PORT, () => {
            logger.info(`🖧  Listening on http://localhost:${env.PORT}/`);
        });
    })
    .catch((err) => {
        logger.error("Failed to connect to database", { error: err.message, stack: err.stack });
        throw new Error("Failed to connect to database");
    });
