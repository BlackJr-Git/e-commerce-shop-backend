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
const isAdminOrAuthor = require("../middlewares/isAdminOrAuthor");
const isAdmin = require("../middlewares/isAdmin");

// Create a new Order
orderRouter.post("/add", authToken, createOrder);

// Get all Orders
orderRouter.get("/", authToken, isAdmin, getAllOrders);

// Get one user Order
orderRouter.get("/user/:userId", authToken, isAdminOrAuthor, getOneUserOrder);

//Get one order by orderId
orderRouter.get(`/:orderId`, authToken, getOneOrder);

// Update Order
orderRouter.put("/update/:orderId", authToken, updateOrder);

module.exports = orderRouter;
