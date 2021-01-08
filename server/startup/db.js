const mongoose = require("mongoose");
const logger = require("./logger");

module.exports = function () {
  mongoose
    .connect("mongodb://localhost/amazone", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => logger.info("conected to mongoDB"));
};
