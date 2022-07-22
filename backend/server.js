import express from "express";
import mongoose from "mongoose";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cors from "cors";

import category from "./routes/category";
import product from "./routes/product";
import user from "./routes/users";
import * as allRouter from "./routes";

import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use((error, req, res, next) => {
  console.log(error);
  return res.sendStatus(500);
});

//config swagger
const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "A simple Express Library API",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
//config env

//database
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("Connect database successfully"));

//router

// app.use("/api", (req, res, next) => next());
app.use("/api", category);
app.use("/api", product);
app.use("/api", user);

//port
const port = process.env.PORT || 8000;
app.listen(port, () => console.log("working on port: ", port));
