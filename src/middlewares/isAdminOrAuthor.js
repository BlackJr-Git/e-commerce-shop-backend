const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

async function isAdminOrAuthor(req, res, next) {
  const { userId } = req.params;
  try {
    const token = req.cookies.token;
    const userPayloads = jwt.verify(token, process.env.SECRET_PRIVATE_KEY);
    req.payload = userPayloads;

    if (req.payload.role === "admin" || req.payload.id === userId) {
      return next();
    }

    res.status(401).send("vous n'avez pas les droits pour cette requête");
  } catch (error) {
    console.log(error);
    res.status(401).send("token d'authentification invalide");
  }
}

module.exports = isAdminOrAuthor;
