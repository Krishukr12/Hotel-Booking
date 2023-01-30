const express = require("express");

const roomsRouter = express.Router();

roomsRouter.get("/", (req, res) => {
  res.send("This is rooms endPoint");
});

module.exports = {
  roomsRouter,
};
