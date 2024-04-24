const { Router } = require("express");

const salesRouter = Router();

const { getAllSales } = require("../controllers/saleController.js");

// get all sales
salesRouter.get("/", getAllSales);

module.exports = salesRouter;
