const { createError } = require("../utils/error.js");
const { verifyToken } = require("../middlewares/verfifyToken.js");
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

module.exports = {
  verifyAdmin,
};
