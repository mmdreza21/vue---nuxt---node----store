require("dotenv").config();
const express = require("express");
const logger = require("./startup/logger");
const app = express();

process.on("unhandledRejection", (ex) => {
  throw ex;
});

require("./middleware/error");
require("./startup/validator")();
require("./startup/db")();
require("./startup/router")(app);

const port = process.env.PORT || 5000;
app.listen(port, () => logger.info(`Example app listening on port${port}!`));
