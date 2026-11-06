const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

async function connectDB() {
   try {
      await mongoose.connect("mongodb+srv://Nishika:htsh@cluster0.rv4xalz.mongodb.net/Nishika");
      console.log("Connected to MongoDB");
   } catch (err) {
      console.error("Error connnectng to MongoDB", err.message);
      process.exit(1);
   }
}

module.exports = connectDB;

