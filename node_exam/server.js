require("dotenv").config();
const app = require("./src/app.js");
const connectDB = require("./src/config/db.js");


connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`🌐 listening on http://localhost:${process.env.PORT}/\n`)
    });
})