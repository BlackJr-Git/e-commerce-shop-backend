const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const { json } = require("express");

const {
  authBaseURI,
  rolesBaseURI,
  usersBaseURI,
  productBaseURI,
  orderBaseURI,
} = require("./config/paths.js");

const {
  authRouter,
  roleRouter,
  userRouter,
  productRouter,
  orderRouter,
} = require("./routes/index.js");

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: [`http://localhost:${PORT}`, "*"],
};
dotenv.config();

// Config
app.use(json());
app.use(cors());
// app.use((req, res, next) => {
//   res.header(
//     "Access-Control-Allow-Headers",
//     "x-access-token, Origin, Content-Type, Accept"
//   );
//   next();
// });

// Routes
app.use(authBaseURI, authRouter);
app.use(rolesBaseURI, roleRouter);
app.use(usersBaseURI, userRouter);
app.use(productBaseURI, productRouter);
app.use(orderBaseURI, orderRouter);

app.listen(PORT, () => {
  console.log(`The server listens on http://localhost:${PORT}`);
});