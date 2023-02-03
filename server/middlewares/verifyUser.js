const createError = require("../utils/error");
const verifyToken = require("../middlewares/verfifyToken.js");
const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      if (err) {
        return next(createError(401, "Token is not valid !"));
      }
    }
  });
};
