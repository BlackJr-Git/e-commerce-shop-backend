const { Router } = require("express");

const messageRouter = Router();

const { createMessage } = require("../controllers/messageController.js");

//Create a new Message
messageRouter.post(`/send`, createMessage);

module.exports = messageRouter;
