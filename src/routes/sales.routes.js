const { Router } = require("express");

const salesRouter = Router();

const { getAllSales, BestSellers } = require("../controllers/saleController.js");

// get all sales
salesRouter.get("/", getAllSales);

// get all sales
salesRouter.get("/best-sellers", BestSellers);

module.exports = salesRouter;
