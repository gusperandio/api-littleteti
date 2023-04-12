/* eslint-disable import/no-extraneous-dependencies */
import express from "express";
import path from "path";
import cors from "cors";
import rateLimit from "express-rate-limit";

import routes from "./routes";
//! Importando database
import "./database";

// const corsOptions = {
//   origin: "https://littleteti.com.br",
//   optionsSuccessStatus: 200,
// };

const apiLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Limite de solicitações atingido",
});

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(
      "/files",
      express.static(path.resolve(__dirname, "..", "uploads"))
    );
    this.server.use(apiLimit);
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
