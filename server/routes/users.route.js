const express = require("express");
const { verifyUser } = require("../middlewares/verifyUser.js");
const { verifyAdmin } = require("../middlewares/verifyAdmin.js");
const usersRouter = express.Router();
const {
  updateUser,
  deleteUser,
  getUsers,
  getUser,
} = require("../controllers/userController");
// *UPDATE USER CONTROLLER
usersRouter.put("/:id", verifyUser, updateUser);

// * DELETE USER CONTROLLER
usersRouter.delete("/:id", verifyUser, deleteUser);

//* GET PARTICULAR USER CONTROLLER
usersRouter.get("/:id", verifyUser, getUser);

// * GET ALL USER CONTROLLER
usersRouter.get("/", verifyAdmin, getUsers);

module.exports = {
  usersRouter,
};
