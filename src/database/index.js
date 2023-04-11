/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable array-callback-return */
import Sequelize from "sequelize";
import databaseConfig from "../config/database";
import User from "../app/models/User";
import Products from "../app/models/Products";
import Solicitations from "../app/models/Solicitations";

const models = [User, Products, Solicitations];

class Database {
  constructor() {
    this.init();
  }

  init() {
    //! Conexão do banco de dados
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => {
      return (
        model.init(this.connection) &&
        model.associate &&
        model.associate(this.connection.models)
      );
    });
  }
}

export default new Database();
