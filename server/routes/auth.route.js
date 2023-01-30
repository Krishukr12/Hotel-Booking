const express = require("express");
const { register, Login } = require("../controllers/authController");

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", Login);

module.exports = {
  authRouter,
};
