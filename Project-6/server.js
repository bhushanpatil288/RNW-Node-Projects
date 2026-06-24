require("dotenv").config();
const app = require("./src/app")
const connectDB = require("./src/config/DB");

connectDB().then(() => {
    app.listen(process.env.PORT || 7070, () => {
        console.log(`listening on http://localhost:${process.env.PORT || 7070}/`)
    })
})