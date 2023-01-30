const express = require("express");

const usersRouter = express.Router();

usersRouter.get("/", (req, res) => {
  res.send("This is users endPoint");
});

module.exports = {
  usersRouter,
};
