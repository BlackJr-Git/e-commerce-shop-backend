const { Router } = require("express");

const { createOrder } = require("../controllers/orderController.js");

const orderRouter = Router();

// Create a new Order
orderRouter.post("/add", createOrder);

module.exports = orderRouter;
