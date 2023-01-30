const { UserModel } = require("../models/User.model");
const { createError } = require("../utils/error.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const register = async (req, res, next) => {
  const { email, password, username } = req.body;
  try {
    bcrypt.hash(password, 10, async function (err, hash) {
      const newUser = new UserModel({
        username: username,
        email: email,
        password: hash,
      });
      await newUser.save();
      res.status(200).json("user has been created");
    });
  } catch (err) {
    next(err);
  }
};

const Login = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found !"));
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or usename"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );
    const { password, isAdmin, ...othersDetails } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...othersDetails });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  register,
  Login,
};
