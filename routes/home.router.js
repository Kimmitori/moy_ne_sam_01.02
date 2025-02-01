const express = require("express");
const homeController = require("../controllers/home.controller.js");
const homeRouter = express.Router();

homeRouter.use("/", homeController.homePage);

module.exports = homeRouter;
