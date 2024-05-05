const { PrismaClient } = require("@prisma/client");
const { Message } = new PrismaClient();

/*
  --------------------------
  Create and save a new message
  in the database
  --------------------------
*/
async function createMessage(req, res) {
  const message = req.body;

  try {
    const newMessage = await Message.create({ data: message });
    return res.send(newMessage);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Une erreur est survenue lors de la reception du messsage");
  }
}

/*
  --------------------------
  Get all messages
  --------------------------
*/

async function getAllMessages(req, res) {
  let { number, pages } = req.query;

  const pageSize = parseInt(number, 10) || 10;
  const currentPage = parseInt(pages, 10) || 1;
  const skip = (currentPage - 1) * pageSize;
  const totalMessages = await Message.count();

  try {
    const messages = await Message.findMany({
      skip,
      take: pageSize,
      orderBy: { createdAt: "desc" }, 
    });
    return res.send({
      messages,
      totalMessages,
      currentPage,
      pageSize,
      totalPages: Math.ceil(totalMessages / pageSize),
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Une erreur est survenue lors de la recuperation des messages");
  }
}

module.exports = {
  createMessage: createMessage,
  getAllMessages: getAllMessages,
};
