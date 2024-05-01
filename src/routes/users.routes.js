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

const userRouter = Router();

//Get all users
userRouter.get(`/`,authToken, getAllUsers);

//Get one user by userId
userRouter.get(`/:userId`,authToken, getOneUser);

//Get one user by email
userRouter.get(`/email/email`, getOneUserByEmail);

//Create a new user
userRouter.post(`/add`, createUser);

//Update user by userId
userRouter.put(`/update/:userId`,authToken, updateUser);

//Delete user by userId
userRouter.delete(`/delete/:userId`,authToken, deleteUser);

//Delete all users
userRouter.delete(`/delete`,authToken, deleteAllUsers);

module.exports = userRouter;
