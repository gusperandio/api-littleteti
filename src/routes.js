import { Router } from "express";
import User from "./app/models/User";

const routes = new Router();

routes.get(`/teste`, async (req, resp) => {
  const user = await User.create({
    name: "Teste",
    email: "teste@gmail.com",
    password_hash: "131313",
  });

  return resp.json(user);
});

export default routes;
