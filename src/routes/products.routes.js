const { Router } = require("express");
const {
  createProduct,
  deleteAllProducts,
  deleteProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  searchProducts,
} = require("../controllers/productcontroller.js");
const authToken  = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

const productRouter = Router();

//Get all Products
productRouter.get(`/`, getAllProducts);

//Get all Products by name
productRouter.get(`/search`, searchProducts);

//Get one Product by ProductId
productRouter.get(`/:productId`, getOneProduct);

//Create a new Product
productRouter.post(`/add`,authToken,isAdmin, createProduct);

//Update Product by ProductId
productRouter.put(`/update/:productId`,authToken, isAdmin,  updateProduct);

//Delete Product by ProductId
productRouter.delete(`/delete/:productId`,authToken, isAdmin, deleteProduct);

//Delete all Products
productRouter.delete(`/delete`,authToken,isAdmin, deleteAllProducts);

module.exports = productRouter;
