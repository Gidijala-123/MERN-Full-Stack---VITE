const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decodedKey) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      } else {
        req.tokenKey = decodedKey.tokenKey;
        next();
      }
    });
  } else {
    return res.status(401).json({ message: "No token" });
  }
});

module.exports = validateToken;
