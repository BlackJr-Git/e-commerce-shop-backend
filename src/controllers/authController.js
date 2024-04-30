const { PrismaClient } = require("@prisma/client");
const { comparePassword } = require("../utils/hashPassword");
const { User } = new PrismaClient();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

/*
--------------------------
Create and save a new user
in the database
--------------------------
*/
async function signup(req, res, next) {
  return res.send("User is created");
}

/*
--------------------------
Activate user account
--------------------------
*/
function activateAccount(req, res, next) {
  return res.send("User account is activated");
}

/*
--------------------------
Signin if user have an account 
and roles 
--------------------------
*/
async function signin(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      const isPasswordValid = await comparePassword(password, user.password);

      if (isPasswordValid) {
        const { password, ...userPayload } = user;
        let token = jwt.sign(userPayload, process.env.SECRET_PRIVATE_KEY);
        const { role, ...userInfo } = userPayload;
        return res.send({
          user: userInfo,
          token: token,
        });
      } else {
        return res.status(404).send("Le mot de passe est incorecte");
      }
    }

    if (!user) {
      return res
        .status(404)
        .send(`L'utilisateur avec l'email : ${email} n'existe pas`);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Une erreur est survenue lors de la connexion");
  }
}

/*
--------------------------
Logout if user is logged 
--------------------------
*/
async function logout(req, res, next) {
  return res.send("User is logout");
}

/*
--------------------------
Recover user account 
--------------------------
*/
async function recoverAccount(req, res, next) {
  return res.send("User account is recovered");
}

/*
--------------------------
Delete user account 
--------------------------
*/
async function deleteAccount(req, res, next) {
  return res.send("User account is deleted");
}

module.exports = {
  activateAccount: activateAccount,
  deleteAccount: deleteAccount,
  logout: logout,
  recoverAccount: recoverAccount,
  signin: signin,
  signup: signup,
};

// export default {
//   activateAccount,
//   deleteAccount,
//   logout,
//   recoverAccount,
//   signin,
//   signup,
// };
