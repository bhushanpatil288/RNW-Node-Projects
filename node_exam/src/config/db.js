const mongoose = require("mongoose");

module.exports = async () => {
    try {
        const mon = await mongoose.connect(process.env.MONGO_URI);
        console.log(`\n✔️  Connected to database: ${mon.connection.name}`)
    } catch (e) {
        console.log("❌ Failed to connect to database")
    }
}