const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name !"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email !"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  phone: {
    type: Number,
    required: [true, "Please provide your phone number !"],
  },
  password: {
    type: String,
    required: [true, "Please provide your password !"],
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please provide your confirmPassword!"],
  },
  photo: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
