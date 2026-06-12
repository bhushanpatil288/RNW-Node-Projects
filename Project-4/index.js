require("dotenv").config();
const connectDB = require("./src/config/connectDB");
const app = require("./src/app");


(async () => {
  await connectDB()
  app.listen(process.env.PORT || 7070, () => {
    console.log(`Listening on http://localhost:${process.env.PORT || 7070}`);
  })
})()


