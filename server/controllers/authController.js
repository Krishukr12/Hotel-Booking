const { UserModel } = require("../models/User.model");
const { createError } = require("../utils/error.js");
const bcrypt = require("bcrypt");
const register = async (req, res, next) => {
  const { email, password, username } = req.body;
  try {
    bcrypt.hash(password, 10, async function (err, hash) {
      // Store hash in your password DB.
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
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username: username });
    if (!user) return next(createError(404, "User not found !"));
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or usename"));
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};
module.exports = {
  register,
  Login,
};
