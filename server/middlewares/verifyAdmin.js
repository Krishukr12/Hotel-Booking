const createError = require("../utils/error.js");
const verifyToken = require("../middlewares/verfifyToken.js");
const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      if (err) {
        return next(createError(403, "Token is not valid !"));
      }
    }
  });
};