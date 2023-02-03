const express = require("express");
//? All Imports
const connection = require("./config/db.js");
const { authRouter } = require("./routes/auth.route.js");
const { hotelsRouter } = require("./routes/hotels.route.js");
const { roomsRouter } = require("./routes/rooms.route.js");
const { usersRouter } = require("./routes/users.route.js");
var cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
app.get("/", (req, res) => {
  res.send("Hi ! Krishu");
});

// * Middlewares
app.use(cookieParser());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/hotels", hotelsRouter);
app.use("/rooms", roomsRouter);
app.use("/users", usersRouter);

// * Specific middleware to handle error
app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || "something went wrong";
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stack: err.stack,
  });
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
  } catch (error) {
    console.log(error);
  }
});
