const express = require("express");
const hotelsRouter = express.Router();
//? ALL IMPORTS

const {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotels,
  getHotel,
} = require("../controllers/hotelController");

//* CREATE HOTEL CONTROLLER
hotelsRouter.post("/", createHotel);

// *UPDATE HOTEL CONTROLLER
hotelsRouter.put("/:id", updateHotel);

// * DELETE HOTEL CONTROLLER
hotelsRouter.delete("/:id", deleteHotel);

//* GET PARTICULAR HOTEL CONTROLLER
hotelsRouter.get("/:id", getHotel);

// * GET ALL HOTEL CONTROLLER
hotelsRouter.get("/", getHotels);

module.exports = {
  hotelsRouter,
};
