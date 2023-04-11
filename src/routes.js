import { Router } from "express";
import authMiddleware from "./app/middlewares/auth";
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";

const routes = new Router();

// routes.get("/users", UserController.search);
routes.post("/users", UserController.store);
routes.post("/session", SessionController.store);

routes.use(authMiddleware); //! todas rotas abaixo necessitam authMiddleare
routes.put("/users", UserController.update);
export default routes;
