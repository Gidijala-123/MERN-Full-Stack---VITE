const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    // unique: true,
  },
  userMail: {
    type: String,
    required: true,
    // unique: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("userColl", userSchema);
