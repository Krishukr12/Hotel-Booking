const express = require("express");
const hotelsRouter = express.Router();
//? ALL IMPORTS
const { HotelModel } = require("../models/Hotel.models");
const { UNSAFE_NavigationContext } = require("react-router-dom");

//* CREATE HOTEL
hotelsRouter.post("/", async (req, res, next) => {
  const newHotel = new HotelModel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
});

// *UPDATE HOTEL
hotelsRouter.put("/:id", async (req, res, next) => {
  try {
    const updatedHotel = await HotelModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(error);
  }
});
// * DELETE HOTEL

hotelsRouter.delete("/:id", async (req, res, next) => {
  try {
    await HotelModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted");
  } catch (error) {
    next(error);
  }
});
//* GET PARTICULAR HOTEL
hotelsRouter.get("/:id", async (req, res, next) => {
  try {
    const hotel = await HotelModel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
});
// * GET ALL HOTEL
hotelsRouter.get("/", async (req, res, next) => {
  try {
    const hotels = await HotelModel.find();
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
});
module.exports = {
  hotelsRouter,
};
