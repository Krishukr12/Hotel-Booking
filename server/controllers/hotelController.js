const { HotelModel } = require("../models/Hotel.models.js");

const createHotel = async (req, res, next) => {
  const newHotel = new HotelModel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

const updateHotel = async (req, res, next) => {
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
};

const deleteHotel = async (req, res, next) => {
  try {
    await HotelModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted");
  } catch (error) {
    next(error);
  }
};

const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await HotelModel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

const getHotel = async (req, res, next) => {
  try {
    const hotel = await HotelModel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  const list = await Promise.all(
    cities.map((item) => {
      return HotelModel.countDocuments({ city: item });
    })
  );
  return res.send(list);
};
const countByType = async (req, res, next) => {
  try {
    const hotelCount = await HotelModel.countDocuments({ type: "hotel" });
    const apartmentCount = await HotelModel.countDocuments({
      type: "apartment",
    });
    const resortCount = await HotelModel.countDocuments({ type: "resort" });
    const villaCount = await HotelModel.countDocuments({ type: "villa" });
    const cabinCount = await HotelModel.countDocuments({ type: "cabin" });
    return res.send([
      {
        type: "hotel",
        count: hotelCount,
      },
      {
        type: "apartment",
        count: apartmentCount,
      },
      {
        type: "resort",
        count: resortCount,
      },
      {
        type: "villa",
        count: villaCount,
      },
      {
        type: "cabin",
        count: cabinCount,
      },
    ]);
  } catch (err) {
    next(err);
  }
  return res.send(list);
};
module.exports = {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotels,
  getHotel,
  countByCity,
  countByType,
};
