require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");

connectDB().then(() => {
    app.listen(process.env.PORT, ()=> {
        console.log(`Listening on port: ${process.env.PORT}`)
    })
})