const app = require("./src/app.js");
const configEnv = require("./src/config/configEnv.js");
const connectDB = require("./src/config/configDB.js");

connectDB().then(() => {
    app.listen(configEnv.PORT, () => {
        console.log(`🖧  Listening on ${configEnv.BASE_URL}:${configEnv.PORT}/`);
    })
})