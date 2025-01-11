const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateToken");

const {
  registerUser,
  loginUser,
  googleLogin,
} = require("../controllers/userController");

router
  .post("/registerUser", registerUser)
  .post("/loginUser", loginUser)
  .post("/googleLogin", googleLogin);

module.exports = router;
