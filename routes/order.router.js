const express = require("express");
const orderController = require("../controllers/order.controller.js");
const orderRouter = express.Router();
const { authorizationMiddleware } = require("../middleware/authorization.middleware.js");

orderRouter.use('/createOrder/:token', authorizationMiddleware, orderController.createOrder)
orderRouter.use('/add/:token', authorizationMiddleware, orderController.addOrderPage)
orderRouter.use('/:token', authorizationMiddleware, orderController.orderPage)

module.exports = orderRouter;