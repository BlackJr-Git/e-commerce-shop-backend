const { Router } = require("express");
const {
  createUser,
  deleteAllUsers,
  deleteUser,
  getAllUsers,
  getOneUser,
  updateUser,
  getOneUserByEmail,
} = require("../controllers/userController.js");

const authToken = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const isAdminOrAuthor = require("../middlewares/isAdminOrAuthor");

const userRouter = Router();

//Get all users
userRouter.get(`/`, authToken, isAdmin, getAllUsers);

//Get one user by userId
userRouter.get(`/:userId`, authToken, isAdminOrAuthor, getOneUser);

//Get one user by email
userRouter.get(`/email/email`, authToken, getOneUserByEmail);

//Create a new user
userRouter.post(`/add`, createUser);

//Update user by userId
userRouter.put(`/update/:userId`, authToken, isAdminOrAuthor, updateUser);

//Delete user by userId
userRouter.delete(`/delete/:userId`, authToken, isAdminOrAuthor, deleteUser);

//Delete all users
userRouter.delete(`/delete`, authToken, isAdmin, deleteAllUsers);

module.exports = userRouter;
