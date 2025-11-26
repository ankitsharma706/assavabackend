const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const Coffee = require("./../models/coffeeModel");

dotenv.config({ path: "./config.env" });

// Use the real Atlas URL
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
mongoose
  .connect(DB)
  .then(() => console.log('DB connection successful'));

// Read json files
const coffees = JSON.parse(
  fs.readFileSync(`${__dirname}/data/coffee.json`, "utf-8")
);

const importData = async () => {
  try {
    await Coffee.create(coffees);
    console.log("Data successfully loaded!");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await Coffee.deleteMany();
    console.log("Data successfully deleted!");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
