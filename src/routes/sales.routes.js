const { Router } = require("express");

const salesRouter = Router();

const { getAllSales, BestSellers } = require("../controllers/saleController.js");

const authToken = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

// get all sales
salesRouter.get("/",authToken, isAdmin, getAllSales);

// get all sales
salesRouter.get("/best-sellers", authToken, isAdmin, BestSellers);

module.exports = salesRouter;
