const express = require("express");

const roomsRouter = express.Router();
const {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoomAvailability,
} = require("../controllers/roomController.js");
const { verifyAdmin } = require("../middlewares/verifyAdmin.js");
//* CREATE ROOM CONTROLLER
roomsRouter.post("/create/:hotleid", verifyAdmin, createRoom);

// *UPDATE ROOM CONTROLLER
roomsRouter.put("/:id", verifyAdmin, updateRoom);
roomsRouter.put("/availability/:id", updateRoomAvailability);

// * DELETE ROOM CONTROLLER
roomsRouter.delete("/:id/:hotleid", verifyAdmin, deleteRoom);

//* GET PARTICULAR ROOM CONTROLLER
roomsRouter.get("/:id", getRoom);

// * GET ALL ROOM CONTROLLER
roomsRouter.get("/", getRooms);

module.exports = {
  roomsRouter,
};
