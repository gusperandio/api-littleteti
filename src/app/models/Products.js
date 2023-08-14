/* eslint-disable array-callback-return */
import Sequelize, { Model } from "sequelize";

class Products extends Model {
  static init(sequelize) {
    super.init(
      {
        name_product: Sequelize.STRING,
        price: Sequelize.FLOAT,
        price_fake: Sequelize.FLOAT,
        girl: Sequelize.BOOLEAN,
        description: Sequelize.STRING,
        active: Sequelize.BOOLEAN,
      },
      {
        sequelize,
        modelName: "products",
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.productSizes, {
      as: "sizes",
      foreignKey: "product_id",
    });
  }
}

export default Products;
