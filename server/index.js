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
app.use(express.json());
app.use("/auth", authRouter);
app.use("/api/hotels", hotelsRouter);
app.use("/rooms", roomsRouter);
app.use("/users", usersRouter);


// ? Specifin middleware to handle error
app.use((err, req, res, next) => {
  res.status(500).json("something went wrong");
});


app.listen(process.env.PORT, async () => {
  try {
    await connection;
  } catch (error) {
    console.log(error);
  }
});
