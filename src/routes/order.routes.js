const { Router } = require("express");

const {
  createOrder,
  getAllOrders,
  updateOrder,
  getOneOrder,
  getOneUserOrder,
} = require("../controllers/orderController.js");

const orderRouter = Router();
const authToken = require("../middlewares/auth");

// Create a new Order
orderRouter.post("/add", authToken, createOrder);

// Get all Orders
orderRouter.get("/", authToken, getAllOrders);

// Get one user Order
orderRouter.get("/user/:userId", authToken, getOneUserOrder);

//Get one order by orderId
orderRouter.get(`/:orderId`, authToken, getOneOrder);

// Update Order
orderRouter.put("/update/:orderId", authToken, updateOrder);

module.exports = orderRouter;
