const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const validateToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decodedKey = jwt.verify(token, process.env.ACCESS_TOKEN);
    req.tokenKey = decodedKey.tokenKey;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = validateToken;
