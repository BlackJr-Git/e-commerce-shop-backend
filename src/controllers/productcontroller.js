const { PrismaClient } = require("@prisma/client");
const { Product } = new PrismaClient();

/*
--------------------------
Retrieve one product from 
the database by id.
--------------------------
*/
async function getOneProduct(req, res) {
  const { productId } = req.params;
  try {
    const product = await Product.findUnique({
      where: {
        ID: +productId,
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
Retrieve products by name from 
the database.
--------------------------
*/
async function searchProducts(req, res) {
  const { name } = req.query;

  try {
    const products = await Product.findMany({
      where: {
        name: {
          startsWith: name,
          mode: "insensitive",
        },
      },
    });

    if (products) {
      return res.send(products);
    }
    return res
      .status(404)
      .send(`Le produit avec le nom : ${name} n'existe pas`);
  } catch (error) {
    console.log(error);
    return res.status(500).send("erreur lors de la lecture des données");
  }
}

/*
--------------------------
Retrieve products by category from 
the database.
--------------------------
*/
async function searchProductsByCategory(req, res) {
  const { category } = req.query;

  try {
    const products = await Product.findMany({
      where: {
        Categories: {
          startsWith: category,
          mode: "insensitive",
        },
      },
    });

    if (products) {
      return res.send(products);
    }
    return res
      .status(404)
      .send(`Le produit avec le nom : ${category} n'existe pas`);
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
async function getAllProducts(req, res) {
  let { number, pages, name } = req.query;

  try {
    const totalProducts = await Product.count();
    const pageSize = parseInt(number, 10) || 10;
    const currentPage = parseInt(pages, 10) || 1;
    let skip = (currentPage - 1) * pageSize;

    const totalPages = Math.ceil(totalProducts / pageSize);

    if (currentPage > totalPages) {
      skip = (totalPages - 1) * pageSize;
    }

    let products = await Product.findMany({
      skip,
      take: pageSize,
      where: {
        name: {
          startsWith: name,
          mode: "insensitive",
        },
      },
    });

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
async function createProduct(req, res) {
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
async function updateProduct(req, res) {
  const { productId } = req.params;

  const product = req.body;
  product.isHighlighted = product.isHighlighted === "on";
  product.isVisible = product.isVisible === "on";

  try {
    const updatedProduct = await Product.update({
      where: {
        ID: +productId,
      },
      data: product || {},
    });

    if (updatedProduct.ID) {
      return res.status(201).send(updatedProduct);
    }
    return res
      .status(404)
      .send(`Le produit avec l'id : ${productId} n'existe pas`);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Erreur lors de la modification des donnes");
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
  const { productId } = req.params;

  try {
    const deletedProduct = await Product.delete({
      where: {
        ID: +productId,
      },
    });

    if (deletedProduct.ID) {
      return res.status(200).send(deletedProduct);
    }
  } catch (error) {
    if (error.code === "P2025") {
      return res
        .status(404)
        .send(`Le produit avec l'id ${productId}  n'a pas été trouvée.`);
    } else {
      console.error(error);
      return res
        .status(500)
        .send("Une erreur est survenue lors de la suppression du coach.");
    }
  }
}

/*
  --------------------------
  Delete all products from 
  the database.
  --------------------------
  */
async function deleteAllProducts(req, res, next) {
  try {
    await Product.deleteMany({});
    return res.send("All Products have been deleted");
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Une erreur est survenue lors de la suppressionn des donnees");
  }
}

module.exports = {
  createProduct: createProduct,
  deleteAllProducts: deleteAllProducts,
  deleteProduct: deleteProduct,
  getAllProducts: getAllProducts,
  getOneProduct: getOneProduct,
  updateProduct: updateProduct,
  searchProducts: searchProducts,
};
