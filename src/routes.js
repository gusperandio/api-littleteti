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
routes.post("/users", UserController.store);
routes.post("/session", SessionController.store);
routes.get("/products", ProductsController.getAll);
routes.post("/products", ProductsController.store);
routes.post("/productsPhotos", upload.array("roupas"));

routes.use(authMiddleware);
// ! todas rotas abaixo necessitam Token Authorization
routes.put("/users", UserController.update);
export default routes;
