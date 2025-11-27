const mongoose = require("mongoose");

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
  );

  const conn = await mongoose.connect(DB);
  isConnected = conn.connections[0].readyState;

  console.log("MongoDB Connected:", isConnected);
}

module.exports = connectDB;
