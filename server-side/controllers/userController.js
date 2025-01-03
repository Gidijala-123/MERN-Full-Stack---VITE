const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
  const { userName, userMail, userPassword } = req.body;
  if (!userName || !userMail || !userPassword) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  const userExists = await userModel.findOne({ userMail });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  } else {
    const hashedPassword = await bcrypt.hash(userPassword, 10);
    const newUser = await userModel.create({
      userName,
      userMail,
      userPassword: hashedPassword,
    });

    if (newUser) {
      return res.status(201).json({
        Message: `Registration Success for ${newUser.userName}`,
      });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { userMail, userPassword } = req.body;
  if (!userMail || !userPassword) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }
  const userFromDb = await userModel.findOne({ userMail });
  if (
    userFromDb &&
    (await bcrypt.compare(userPassword, userFromDb.userPassword))
  ) {
    const generateToken = jwt.sign(
      {
        tokenKey: {
          userMail: userFromDb.userMail,
          userName: userFromDb.userName,
          userId: userFromDb._id,
        },
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "30m" }
    );
    if (generateToken) {
      return res.status(200).json({ AccessToken: generateToken });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } else {
    return res.status(401).json({ message: "Invalid email or password" });
  }
});

module.exports = { registerUser, loginUser };
