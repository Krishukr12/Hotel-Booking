const { RoomModel } = require("../models/Rooms.models.js");
const { HotelModel } = require("../models/Hotel.models.js");
const createRoom = async (req, res, next) => {
  const hotleId = req.params.hotleid;
  const newRoom = new RoomModel(req.body);
  try {
    const savedRoom = await newRoom.save();
    try {
      await HotelModel.findByIdAndUpdate(hotleId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await RoomModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};
const updateRoomAvailability = async (req, res, next) => {
  try {
    await RoomModel.updateOne(
      {
        "roomNumbers._id": req.params.id,
      },
      { $push: { "roomNumbers.$.unavailableDates": req.body.dates } }
    );
    res.status(200).json("room updated successfully");
  } catch (error) {
    next(error);
  }
};

const deleteRoom = async (req, res, next) => {
  const hotleId = req.params.hotleid;

  try {
    await RoomModel.findByIdAndDelete(req.params.id);
    try {
      await HotelModel.findByIdAndUpdate(hotleId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Room has been deleted");
  } catch (error) {
    next(error);
  }
};

const getRooms = async (req, res, next) => {
  try {
    const rooms = await RoomModel.find();
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};

const getRoom = async (req, res, next) => {
  try {
    const room = await RoomModel.findById(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoomAvailability,
};
