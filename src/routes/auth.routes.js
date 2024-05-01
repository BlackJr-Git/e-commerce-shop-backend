const { Router } = require("express");
const authToken = require("../middlewares/auth");
const {
  activateAccount,
  deleteAccount,
  logout,
  recoverAccount,
  signin,
  signup,
  isAdmin,
} = require("../controllers/authController.js");



const authRouter = Router();

authRouter.post("/signup", signup);

authRouter.post("/signin", signin);

authRouter.get("/activate-account", activateAccount);

authRouter.get("/logout", logout);

authRouter.post("/recover-account", recoverAccount);

authRouter.post("/delete-account", authToken, deleteAccount);

authRouter.post("/verify", isAdmin);

module.exports = authRouter;
