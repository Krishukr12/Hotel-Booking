const express = require("express");
const hotelsRouter = express.Router();
//? ALL IMPORTS

const {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotels,
  getHotel,
  countByCity,
  countByType,
  getHotelRooms,
} = require("../controllers/hotelController");
const { verifyAdmin } = require("../middlewares/verifyAdmin.js");
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

//GET THE COUNT OF HOTEL ACCORDING TO TYPE AND CITY
hotelsRouter.get("/find/countByCity", countByCity);
hotelsRouter.get("/find/countByType", countByType);
hotelsRouter.get("/room/:id", getHotelRooms);
module.exports = {
  hotelsRouter,
};
