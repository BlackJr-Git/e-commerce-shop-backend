import data from "../../assets/initial-data.json" assert { type: "json" };
// import data from "../../assets/data.json" assert { type: "json" };

const userData = data.users;
const productsData = data.products;

function findProductById(id) {
  return productsData.find((product) => product.id === +id);
}

function findProductIndex(id) {
  return productsData.findIndex((product) => product.id === +id);
}
/*
--------------------------
Retrieve one product from 
the database.
--------------------------
*/
async function getOneProduct(req, res, next) {
  const { ProductId } = req.params;
  let product = findProductById(ProductId);
  if (product) {
    return res.send(product);
  }
  return res.status(404).send(`Le tweet avec l'id : ${ProductId} n'existe pas`);
}

/*
  --------------------------
  Retrieve all products from 
  the database.
  --------------------------
  */
async function getAllProducts(req, res, next) {
  let { number, pages } = req.query;
  pages = pages || 1;
  number = number || 10;
  const firstIndex = (+pages - 1) * number;
  const lasIndex = +pages * number;
  const products = productsData.slice(firstIndex, lasIndex);
  return res.send(products);
}

/*
  --------------------------
  Retrieve all one user product from 
  the database.
  --------------------------
  */
async function getUserProducts(req, res, next) {
  //   const { userName } = req.params;
  //   if (userName) {
  //     let userId = userData.find((user) => user.handle === userName);
  //     const userTweets = ProductData.filter((tweet) => tweet.author == userId.id);
  //     return res.send(userTweets);
  //   }
  //   return res
  //     .status(404)
  //     .send(`L'utilisateur avec le handle ${userName} n'existe pas`);
}

/*
  --------------------------
  Create and save a new product
  in the database
  --------------------------
  */
async function createProduct(req, res, next) {
  const newProduct = req.body;
  if (newProduct.text) {
    newProduct.id = productsData.length + 1;
    productsData.push(newProduct);
    return res.status(201).send(productsData[productsData.length - 1]);
  }
  return res.status(404).res("Les donnée de votre produit sont incomplete");
}

/*
  --------------------------
  Update a product by the id 
  in the request
  --------------------------
  */
async function updateProduct(req, res, next) {
  const product = req.body;
  const { ProductId } = req.params;
  const ProductIndex = findProductIndex(ProductId);
  if (ProductIndex < 0) {
    productsData.push(product);
    return res.status(201).send(productsData[productsData.length - 1]);
  } else {
    productsData[ProductIndex] = product;
    return res.status(200).send(productsData[ProductIndex]);
  }
}

/*
  --------------------------
  Delete a product with 
  the specified id 
  in the request
  --------------------------
  */
async function deleteProduct(req, res, next) {
  const { ProductId } = req.params;
  const productIndex = findProductIndex(ProductId);
  const product = findProductById(ProductId);
  if (productIndex < 0) {
    return res
      .status(404)
      .send(`L'article avec l'id ${ProductId} n'existe pas`);
  } else {
    productsData.splice(productIndex, 1);
    return res.status(202).send(product);
  }
}

/*
  --------------------------
  Delete all products from 
  the database.
  --------------------------
  */
async function deleteAllProducts(req, res, next) {
  productsData = [];
  return res.send("All Products have been deleted");
}

export {
  createProduct,
  deleteAllProducts,
  getUserProducts,
  deleteProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
};

export default {
  createProduct,
  deleteAllProducts,
  getUserProducts,
  deleteProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
};
