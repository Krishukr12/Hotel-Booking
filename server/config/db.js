const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", true);
const connection = mongoose.connect(process.env.MONGO_URL);

// ?  For Constant Checking either mongoDB is connected or not

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected");
});
mongoose.connection.on("connected", () => {
  console.log("mongoDB is connected");
});

module.exports = {
  connection,
};
