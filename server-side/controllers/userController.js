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
    return res.status(400).json({ message: "Please fill out all fields..!" });
  }

  try {
    const userFromDb = await userModel.findOne({ userMail });
    if (
      userFromDb &&
      (await bcrypt.compare(userPassword, userFromDb.userPassword))
    ) {
      const generateToken = jwt.sign(
        {
          tokenKey: {
            id: userFromDb._id,
            userName: userFromDb.userName,
            userMail: userFromDb.userMail,
          },
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: "30m" }
      );

      const { userPassword, ...rest } = userFromDb._doc; // Hide password in the response

      return res
        .status(200)
        .cookie("token", generateToken, { httpOnly: true })
        .json(rest);
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    next(error);
  }
});

const googleLogin = asyncHandler(async (req, res, next) => {
  const { googleName, googleEmail, googlePhotoUrl } = req.body;

  try {
    let user = await userModel.findOne({ userMail: googleEmail });

    if (!user) {
      const hashedPassword = await bcrypt.hash(
        Math.random().toString(36).slice(-8),
        10
      );
      user = await userModel.create({
        userName:
          googleName.toLowerCase().split(" ").join("") +
          Math.floor(Math.random() * 1000),
        userMail: googleEmail,
        userPassword: hashedPassword,
        userProfilePic: googlePhotoUrl,
      });
      await user.save();
    }

    const generateToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, {
      expiresIn: "30m",
    });

    const { userPassword, ...rest } = user._doc; // Hide password in the response
    res
      .status(200)
      .cookie("accessToken", generateToken, { httpOnly: true })
      .json(rest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = { registerUser, loginUser, googleLogin };
