require("express-async-errors");
const express = require("express");
const cors = require("cors");
const cat = require("../router/cat");
const item = require("../router/item");
const user = require("../router/user");
const auth = require("../router/auth");
const order = require("../router/order");

module.exports = function (app) {
  app.use(express.json());
  app.use(cors());
  app.use("/api/cat", cat);
  app.use("/api/item", item);
  app.use("/api/user", user);
  app.use("/api/auth", auth);
  app.use("/api/order", order);
};
