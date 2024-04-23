const { Router } = require("express");
const {
  createProduct,
  deleteAllProducts,
  deleteProduct,
  getAllProducts,
  getOneProduct,
  updateProduct
} = require("../controllers/productcontroller.js"
)

const productRouter = Router();

//Get all Products
productRouter.get(`/`, getAllProducts);

//Get one Product by ProductId
productRouter.get(`/:productId`, getOneProduct);

//Create a new Product
productRouter.post(`/add`, createProduct);

//Update Product by ProductId
productRouter.put(`/update/:productId`, updateProduct);

//Delete Product by ProductId
productRouter.delete(`/delete/:productId`, deleteProduct);

//Delete all Products
productRouter.delete(`/delete`, deleteAllProducts);

module.exports = productRouter;
