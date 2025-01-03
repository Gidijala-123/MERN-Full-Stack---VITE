const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 9999;

app.listen(port, () => {
  console.log("Server is running on port:", port);
});

const dbConn = require("./config/dbConn");
dbConn();

app.use(express.json());
