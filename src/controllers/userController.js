// import data from "../../assets/initial-data.json" assert { type: "json" };
const data = require("../../assets/initial-data.json");
const { hashPassword } = require("../utils/hashPassword");

const { PrismaClient } = require("@prisma/client");
const { User } = new PrismaClient();

/*
--------------------------
Retrieve one by user id from 
the database.
--------------------------
*/
async function getOneUser(req, res) {
  const { userId } = req.params;
  try {
    const user = await User.findUnique({
      where: {
        id: +userId,
      },
    });

    if (user.id) {
      return res.send(user);
    }
    return res
      .status(404)
      .send(`L'utilisateur avec l'id : ${userId} n'existe pas`);
  } catch (error) {
    console.log(error);
    return res.status(500).send("erreur lors de la lecture des données");
  }
}

async function getOneUserByEmail(req, res) {
  const { email } = req.body;
  try {
    const user = await User.findUnique({
      where: {
        email: email,
      },
    });

    if (user.email) {
      return res.send(user);
    }
    return res
      .status(404)
      .send(`L'utilisateur avec l'email : ${email} n'existe pas`);
  } catch (error) {
    console.log(error);
    return res.status(500).send("erreur lors de la lecture des données");
  }
}

/*
--------------------------
Retrieve all users from 
the database.
--------------------------
*/
async function getAllUsers(req, res, next) {
  let { number, pages } = req.query;

  try {
    const pageSize = parseInt(number, 10) || 10;
    const currentPage = parseInt(pages, 10) || 1;
    const skip = (currentPage - 1) * pageSize;

    let users = await User.findMany({
      skip,
      take: pageSize,
    });

    const totalUser = await User.count();

    return res.send({
      orders: users,
      totalUser,
      currentPage,
      pageSize,
      totalPages: Math.ceil(totalUser / pageSize),
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("Une erreur est survenue lors de la lecture des données");
  }
}

/*
--------------------------
Create and save a new user
in the database
--------------------------
*/
async function createUser(req, res, next) {
  const user = req.body;

  user.password = await hashPassword(user.password);

  try {
    const newUser = await User.create({ data: user });
    return res.send(newUser);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Une erreur est survenue lors de la création du produit");
  }
}

/*
--------------------------
Update a user by the id 
in the request
--------------------------
*/
async function updateUser(req, res) {
  const { userId } = req.params;
  try {
    const updatedUser = await User.update({
      where: {
        id: +userId,
      },
      data: req.body || {},
    });

    if (updatedUser.id) {
      return res.status(201).send(updatedUser);
    }
    return res
      .status(404)
      .send(`L'utilisateur avec l'id : ${userId} n'existe pas`);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Erreur lors de la modification des donnes");
  }
}

/*
--------------------------
Delete a user with 
the specified id 
in the request
--------------------------
*/
async function deleteUser(req, res) {
  const { userId } = req.params;

  try {
    const deletedUser = await User.delete({
      where: {
        id: +userId,
      },
    });

    if (deletedUser.id) {
      return res.status(200).send(deletedUser);
    }
  } catch (error) {
    if (error.code === "P2025") {
      return res
        .status(404)
        .send(`L'utilisateur avec l'id ${userId}  n'a pas été trouvée.`);
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
Delete all users from 
the database.
--------------------------
*/
async function deleteAllUsers(req, res, next) {
  try {
    await User.deleteMany({});
    return res.send("All Products have been deleted");
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Une erreur est survenue lors de la suppressionn des donnees");
  }
}

module.exports = {
  createUser: createUser,
  deleteAllUsers: deleteAllUsers,
  deleteUser: deleteUser,
  getAllUsers: getAllUsers,
  getOneUser: getOneUser,
  updateUser: updateUser,
  getOneUserByEmail: getOneUserByEmail,
};
