/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable array-callback-return */
import Sequelize from "sequelize";
import databaseConfig from "../config/database";
import User from "../app/models/User";
import Products from "../app/models/Products";
import Solicitations from "../app/models/Solicitations";
import ProductSizes from "../app/models/ProductSizes";

const models = [User, Solicitations, Products, ProductSizes];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.forEach((model) => {
      model.init(this.connection);
    });

    models.forEach((model) => {
      if (model.associate) {
        model.associate(this.connection.models);
      }
    });
  }
}

export default new Database();
