const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function isAdmin(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send("token d'authentification invalide");
  }

  try {
    const userPayloads = jwt.verify(token, process.env.SECRET_PRIVATE_KEY);
    const { role } = userPayloads;
    if (role === "admin") {
      return next();
    }
    return res.send("token d'authentification invalide");
  } catch (error) {
    console.log(error);
    return res.status(401).send("token d'authentification invalide");
  }
}

module.exports = isAdmin;
