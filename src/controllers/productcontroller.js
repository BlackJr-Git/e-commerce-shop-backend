const productsData = require("../../assets/products");

const { PrismaClient } = require("@prisma/client");
const { Product } = new PrismaClient();

function findProductById(id) {
  return productsData.find((product) => product.ID === +id);
}

function findProductIndex(id) {
  return productsData.findIndex((product) => product.ID === +id);
}
/*
--------------------------
Retrieve one product from 
the database.
--------------------------
*/
async function getOneProduct(req, res, next) {
  const { productId } = req.params;
  try {
    const product = await Product.findUnique({
      where: {
        ID : +productId,
      },
    });

    if (product.ID) {
      return res.send(product);
    }
    return res
      .status(404)
      .send(`Le produit avec l'id : ${productId} n'existe pas`);
  } catch (error) {
    console.log(error);
    return res.status(500).send("erreur lors de la lecture des données");
  }
}

/*
  --------------------------
  Retrieve all products from 
  the database.
  --------------------------
  */
async function getAllProducts(req, res, next) {
  let { number, pages } = req.query;

  try {
    const pageSize = parseInt(number, 10) || 10;
    const currentPage = parseInt(pages, 10) || 1;
    const skip = (currentPage - 1) * pageSize;

    let products = await Product.findMany({ skip, take: pageSize });
    const totalProducts = await Product.count();

    return res.send({
      products,
      totalProducts,
      currentPage,
      pageSize,
      totalPages: Math.ceil(totalProducts / pageSize),
    });

  } catch (error) {
    console.log(error);
    res.status(500).send("Error while fetching data");
  }
}

/*
  --------------------------
  Create and save a new product
  in the database
  --------------------------
  */
async function createProduct(req, res, next) {
  const product = req.body;
  try {
    const newProduct = await Product.create({ data: product });
    return res.send(newProduct);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Une erreur est survenue lors de la création du produit");
  }
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
  await Product.deleteMany({});
  return res.send("All Products have been deleted");
}

module.exports = {
  createProduct: createProduct,
  deleteAllProducts: deleteAllProducts,
  deleteProduct: deleteProduct,
  getAllProducts: getAllProducts,
  getOneProduct: getOneProduct,
  updateProduct: updateProduct,
};
