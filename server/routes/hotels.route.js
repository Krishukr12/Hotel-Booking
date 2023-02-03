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
const verifyAdmin = require("../middlewares/verifyAdmin.js");
//* CREATE HOTEL CONTROLLER
hotelsRouter.post("/create", verifyAdmin, createHotel);

// *UPDATE HOTEL CONTROLLER
hotelsRouter.put("/:id", verifyAdmin, updateHotel);

// * DELETE HOTEL CONTROLLER
hotelsRouter.delete("/:id", verifyAdmin, deleteHotel);

//* GET PARTICULAR HOTEL CONTROLLER
hotelsRouter.get("/:id", getHotel);

// * GET ALL HOTEL CONTROLLER
hotelsRouter.get("/", getHotels);

module.exports = {
  hotelsRouter,
};
