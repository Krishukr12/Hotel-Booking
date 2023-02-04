const { createError } = require("../utils/error");
const { verifyToken } = require("../middlewares/verfifyToken.js");
const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(401, "You are not authorized !"));
    }
  });
};
module.exports = {
  verifyUser,
};
