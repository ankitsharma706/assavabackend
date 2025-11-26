const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = require("./app");

// 1️⃣ Load DB connection string
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

// 2️⃣ Connect to MongoDB
mongoose
  .connect(DB)     // no need for deprecated options
  .then(() => console.log("✔ MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("❌ DB connection error:", err);
    process.exit(1);
  });

// 3️⃣ Start server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}...`);
});

// 4️⃣ Handle unhandled rejections
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION!", err.message);
  process.exit(1);
});
