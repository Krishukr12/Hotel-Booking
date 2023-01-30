const express = require("express");
const connection = require("./config/db.js");
require("dotenv").config();
const app = express();

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("DB: Connected successfully");
  } catch (error) {
    console.log(error);
  }
});
