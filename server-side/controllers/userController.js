const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  try {
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await userModel.create({
        username,
        email,
        password: hashedPassword,
      });
      if (newUser) {
        return res.status(201).json({
          message: `Registration Success for ${newUser.username}`,
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
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    return res.status(400).json({ message: "Please fill out all fields..!" });
  }

  try {
    const validUser = await userModel.findOne({ email });
    if (validUser && (await bcrypt.compare(password, validUser.password))) {
      const generateToken = jwt.sign(
        {
          tokenKey: {
            id: validUser._id,
            username: validUser.username,
            email: validUser.email,
          },
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: "30m" }
      );
      const { password, ...rest } = validUser._doc; // Hide password in the response
      return res
        .status(200)
        .cookie("token", generateToken, { httpOnly: true })
        .json(rest);
    } else {
      // return res.status(401).json({ message: "Invalid email or password" });
      next(errorHandler(404, "Invalid email or password"));
    }
  } catch (error) {
    next(error);
  }
});

const googleLogin = asyncHandler(async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      const generateToken = jwt.sign(
        {
          tokenKey: {
            id: user._id,
          },
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: "30m" }
      );
      const { password, ...rest } = user._doc; // Hide password in the response
      res
        .status(200)
        .cookie("accessToken", generateToken, { httpOnly: true })
        .json(rest);
    } else {
      const createPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(createPassword, 10);
      const newUser = new userModel({
        username:
          name
            .toLowerCase()
            .split(" ")
            .join("")
            .replace(/\s/g, "")
            .slice(0, 10) + Math.floor(Math.random() * 1000),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const generateToken = jwt.sign(
        {
          tokenKey: {
            id: newUser._id,
          },
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: "30m" }
      );
      const { password, ...rest } = newUser._doc; // Hide password in the response
      res
        .status(200)
        .cookie("accessToken", generateToken, { httpOnly: true })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = { registerUser, loginUser, googleLogin };
