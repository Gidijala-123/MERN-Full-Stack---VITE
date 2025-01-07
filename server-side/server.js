const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 9999;

app.listen(port, () => {
  console.log("Server is running on port:", port);
});
app.use(express.json());

const dbConn = require("./config/dbConn");
dbConn();

const cors = require("cors");
app.use(cors());
// app.use(cors({ origin: "http://localhost:5173" }));

const errorHandler = require("./middleware/errorHandling");
app.use(errorHandler);

app.use("/api/userDetails", require("./routers/userRouter"));
