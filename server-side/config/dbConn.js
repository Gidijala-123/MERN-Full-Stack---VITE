const mongoose = require("mongoose");
require("dotenv").config();

const dbConn = async () => {
  const connectionString = process.env.CONNECTION_STRING;
  try {
    const dbConnection = await mongoose.connect(connectionString);
    console.log("DB Connected successfully");
    console.log("DB Name :", dbConnection.connection.name);
  } catch (err) {
    console.log(err);
  }
};

module.exports = dbConn;
