/* eslint-disable import/no-extraneous-dependencies */

import { Router } from "express";
import multer from "multer";
import authMiddleware from "./app/middlewares/auth";
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import ProductsController from "./app/controllers/ProductsController";
import uploadConfig from "./config/upload";

const routes = new Router();
const upload = multer(uploadConfig);

// ? Rotas livres

//* USERS
routes.get("/users/:email", UserController.checkEmail);
routes.post("/users", UserController.newUser);
routes.post("/session", SessionController.store);

//*  PRODUCTS
routes.get("/products", ProductsController.getAll);
routes.get("/products/:id", ProductsController.getOne);
routes.get("/products/:id/:girl", ProductsController.getFooter);
routes.post("/products", ProductsController.store);
routes.post("/productsPhotos", upload.array("roupas", 3), (req, resp) => {
  resp.status(201);
  resp.end();
});

// ! Rotas trancadas via TOKEN
routes.use(authMiddleware);
routes.options("/", (req, resp) => {
  resp.status(200);
});
routes.put("/users", UserController.update);

export default routes;
