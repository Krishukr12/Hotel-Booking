const express = require("express");
//? All Imports
const connection = require("./config/db.js");
const { authRouter } = require("./routes/auth.route.js");
const { hotelsRouter } = require("./routes/hotels.route.js");
const { roomsRouter } = require("./routes/rooms.route.js");
const { usersRouter } = require("./routes/users.route.js");
// const { verifyUser } = require("./middlewares/verifyUser.js");
// const { verifyToken } = require("./middlewares/verfifyToken.js");
// const { verifyAdmin } = require("./middlewares/verifyAdmin.js");
var cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hi ! Krishu");
});

// Testing authentication and autherization middleware

// app.get("/token", verifyToken, (req, res) => {
//   res.send("Token is available");
// });
// app.get("/userverify/:id", verifyUser, (req, res) => {
//   res.send("You are a user");
// });
// app.get("/admin/:id", verifyAdmin, (req, res) => {
//   res.send("you are a admin");
// });
// * Middlewares
app.use(cors());
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
