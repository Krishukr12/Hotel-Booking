const express = require("express");
//? All Imports
const connection = require("./config/db.js");
const { authRouter } = require("./routes/auth.route.js");
require("dotenv").config();

const app = express();
app.get("/", (req, res) => {
  res.send("Hi ! Krishu");
});

//? Middlewares
app.use("/auth", authRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
  } catch (error) {
    console.log(error);
  }
});
