/* eslint-disable import/no-extraneous-dependencies */

import { Router } from "express";
import authMiddleware from "./app/middlewares/auth";
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import ProductsController from "./app/controllers/ProductsController";


const routes = new Router();

// ? Rotas livres
routes.post("/users", UserController.store);
routes.post("/session", SessionController.store);
routes.get("/products", ProductsController.store);

routes.use(authMiddleware);

// ! todas rotas abaixo necessitam Token Authorization
routes.put("/users", UserController.update);
export default routes;
