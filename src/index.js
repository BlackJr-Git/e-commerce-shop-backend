import cors from "cors";
// import dotenv from "dotenv";
import express, { json } from "express";
import fs from "fs";
import {
  authBaseURI,
  rolesBaseURI,
  usersBaseURI,
  productBaseURI,
} from "./config/paths.js";

import {
  authRouter,
  roleRouter,
  userRouter,
  productRouter,
} from "./routes/index.js";
// import productRouter from "./routes/products.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: [
    `http://localhost:${PORT}`,"*"
  ],
};
// dotenv.config();


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

app.listen(PORT, () => {
  console.log(`The server listens on http://localhost:${PORT}`);
});
