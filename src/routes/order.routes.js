const { Router } = require("express");

const {
  createOrder,
  getAllOrders,
  updateOrder,
  getOneOrder,
  getOneUserOrder,
} = require("../controllers/orderController.js");

const orderRouter = Router();

// Create a new Order
orderRouter.post("/add", createOrder);

// Get all Orders
orderRouter.get("/", getAllOrders);

// Get one user Order
orderRouter.get("/user/:userId", getOneUserOrder); 

//Get one order by orderId
orderRouter.get(`/:orderId`, getOneOrder);

// Update Order
orderRouter.put("/update/:orderId", updateOrder);

module.exports = orderRouter;
