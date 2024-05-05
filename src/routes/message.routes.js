const { Router } = require("express");

const messageRouter = Router();

const { createMessage, getAllMessages } = require("../controllers/messageController.js");

const authToken = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

//Create a new Message
messageRouter.post(`/send`, createMessage);

//Get all Messages
messageRouter.get(`/`,authToken,isAdmin, getAllMessages);

module.exports = messageRouter;
