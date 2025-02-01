const express = require("express");
const userController = require("../controllers/user.controller.js");
const userRouter = express.Router();

userRouter.use("/registration", userController.registrationPage);
userRouter.use("/login", userController.loginPage);
userRouter.use("/loginUser", userController.authorizeUser);
userRouter.use("/createUser", userController.addUser);


module.exports = userRouter;