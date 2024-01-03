const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    validate: [validator.isEmail, "Please provide valid email"],
  },
  gender: {
    type: String,
    required: [true, "Please provide your gender"],
  },
  status: {
    type: String,
    required: [true, "Please provide your current status"],
  },
});

// mongoose middleware :pre
userSchema.pre("save", function (next) {
  console.log("pre middleware");
  this.name = this.name.toLowerCase();
  this.email = this.email.toLowerCase();
  this.gender = this.gender.toLowerCase();
  this.status = this.status.toLowerCase();

  next();
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
