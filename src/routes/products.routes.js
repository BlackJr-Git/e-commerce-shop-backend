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

const productRouter = Router();

//Get all Products
productRouter.get(`/`, getAllProducts);

//Get all Products by name
productRouter.get(`/search`, searchProducts);

//Get one Product by ProductId
productRouter.get(`/:productId`, getOneProduct);

//Create a new Product
productRouter.post(`/add`,authToken, createProduct);

//Update Product by ProductId
productRouter.put(`/update/:productId`,authToken,  updateProduct);

//Delete Product by ProductId
productRouter.delete(`/delete/:productId`,authToken, deleteProduct);

//Delete all Products
productRouter.delete(`/delete`,authToken, deleteAllProducts);

module.exports = productRouter;
