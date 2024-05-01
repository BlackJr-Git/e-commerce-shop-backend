const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

async function authToken(req, res, next) {
  try {
    const token = req.cookies.token;
    const userPayloads = jwt.verify(token, process.env.SECRET_PRIVATE_KEY);
    req.payload = userPayloads;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send("token d'authentification invalide");
  }
}

module.exports = authToken;
