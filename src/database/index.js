/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable array-callback-return */
import Sequelize from "sequelize";
import databaseConfig from "../config/database";
import User from "../app/models/User";

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    //! Conexão do banco de dados
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => {
      model.init(this.connection);
    });
  }
}

export default new Database();
