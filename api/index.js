const serverless = require("serverless-http");
const app = require("../app");
const connectDB = require("../utils/db");

module.exports = async (req, res) => {
  await connectDB();   // IMPORTANT for Vercel
  const handler = serverless(app);
  return handler(req, res);
};
