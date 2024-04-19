const authRouter = require("./auth.routes.js");
const roleRouter = require("./roles.routes.js");
const userRouter = require("./users.routes.js");
const productRouter = require("./products.routes.js");
const orderRouter = require("./order.routes.js") 

module.exports = {
  authRouter: authRouter,
  roleRouter: roleRouter,
  userRouter: userRouter,
  productRouter: productRouter,
  orderRouter : orderRouter
};

