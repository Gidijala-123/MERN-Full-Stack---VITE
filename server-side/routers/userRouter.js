const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateToken");

const { registerUser, loginUser } = require("../controllers/userController");

router.post("/registerUser", registerUser).post("/loginUser", loginUser);

module.exports = router;
