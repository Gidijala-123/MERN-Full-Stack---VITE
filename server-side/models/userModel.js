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
  userProfilePic: {
    type: String,
    default:
      "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("userColl", userSchema);
