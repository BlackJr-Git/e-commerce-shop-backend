const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");
const { json } = require("express");

const {
  authBaseURI,
  rolesBaseURI,
  usersBaseURI,
  productBaseURI,
  orderBaseURI,
  salesBaseURI,
  messagesBaseURI,
} = require("./config/paths.js");

const {
  authRouter,
  roleRouter,
  userRouter,
  productRouter,
  orderRouter,
  salesRouter,
  messageRouter,
} = require("./routes/index.js");

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: [`http://localhost:5173`, "https://nawtech.vercel.app"],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
};
dotenv.config();

// Config
app.use(cookieParser());
app.use(json());
app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// Routes
app.use(authBaseURI, authRouter);
app.use(rolesBaseURI, roleRouter);
app.use(usersBaseURI, userRouter);
app.use(productBaseURI, productRouter);
app.use(orderBaseURI, orderRouter);
app.use(salesBaseURI, salesRouter);
app.use(messagesBaseURI, messageRouter);

app.listen(PORT, () => {
  console.log(`The server listens on http://localhost:${PORT}`);
});
