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
productRouter.get(`/:ProductId`, getOneProduct);

//Create a new Product
productRouter.post(`/add`, createProduct);

//Update Tweet by ProductId
productRouter.put(`/update/:ProductId`, updateProduct);

//Delete Tweet by ProductId
productRouter.delete(`/delete/:ProductId`, deleteProduct);

//Delete all Products
productRouter.delete(`/delete`, deleteAllProducts);

module.exports = productRouter;
