const express = require("express");

const hotelsRouter = express.Router();

hotelsRouter.get("/", (req, res) => {
  res.send("This is hotels endPoint");
});

module.exports = {
  hotelsRouter,
};
