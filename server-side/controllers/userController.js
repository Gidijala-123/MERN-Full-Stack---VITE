const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res, next) => {
  const { userName, userMail, userPassword } = req.body;
  if (!userName || !userMail || !userPassword) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  try {
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
          message: `Registration Success for ${newUser.userName}`,
        });
      } else {
        return res.status(400).json({ message: "Invalid user data" });
      }
    }
  } catch (error) {
    next(error);
  }
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { userMail, userPassword } = req.body;
  if (!userMail || !userPassword) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  try {
    const user = await userModel.findOne({ userMail });
    if (user && (await bcrypt.compare(userPassword, user.userPassword))) {
      const generateToken = jwt.sign(
        {
          user: {
            id: user._id,
            userName: user.userName,
            userMail: user.userMail,
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
  } catch (error) {
    next(error);
  }
});

module.exports = { registerUser, loginUser };

module.exports = { registerUser, loginUser };
