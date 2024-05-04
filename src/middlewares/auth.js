const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

async function authToken(req, res, next) {
  const token = await req.cookies.token;
  // console.log(token);
  try {
    const userPayloads = jwt.verify(token, process.env.SECRET_PRIVATE_KEY);
    req.payload = userPayloads;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send("token d'authentification invalide");
  }
}

module.exports = authToken;
