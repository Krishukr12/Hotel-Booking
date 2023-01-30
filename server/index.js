const express = require("express");
//? All Imports
const connection = require("./config/db.js");
const { authRouter } = require("./routes/auth.route.js");
const { hotelsRouter } = require("./routes/hotels.route.js");
const { roomsRouter } = require("./routes/rooms.route.js");
const { usersRouter } = require("./routes/users.route.js");
require("dotenv").config();

const app = express();
app.get("/", (req, res) => {
  res.send("Hi ! Krishu");
});

//? Middlewares
app.use("/auth", authRouter);
app.use("/hotels", hotelsRouter);
app.use("/rooms", roomsRouter);
app.use("/users", usersRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
  } catch (error) {
    console.log(error);
  }
});
