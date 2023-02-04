const jwt = require("jsonwebtoken");
const { createError } = require("../utils/error.js");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(createError(403, "Token is not valid"));
    req.user = user;
    next();
  });
};
module.exports = {
  verifyToken,
};
