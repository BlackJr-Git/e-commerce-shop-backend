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

module.exports = {
  createMessage: createMessage,
};
