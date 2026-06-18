require("dotenv").config();
const app = require("./src/app")

app.listen(process.env.PORT || 7070, ()=> {
    console.log(`listening on http://localhost:${process.env.PORT || 7070}/`)
})