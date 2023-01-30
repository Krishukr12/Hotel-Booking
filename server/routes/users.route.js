const express = require("express");

const usersRouter = express.Router();
const {
  updateUser,
  deleteUser,
  getUsers,
  getUser,
} = require("../controllers/userController");
// *UPDATE USER CONTROLLER
usersRouter.put("/:id", updateUser);

// * DELETE USER CONTROLLER
usersRouter.delete("/:id", deleteUser);

//* GET PARTICULAR USER CONTROLLER
usersRouter.get("/:id", getUser);

// * GET ALL USER CONTROLLER
usersRouter.get("/", getUsers);

module.exports = {
  usersRouter,
};
