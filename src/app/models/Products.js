import Sequelize, { Model } from "sequelize";

class Products extends Model {
  static init(sequelize) {
    super.init(
      {
        name_product: Sequelize.STRING,
        price: Sequelize.FLOAT,
        price_fake: Sequelize.FLOAT,
        colors: Sequelize.ARRAY(Sequelize.STRING),
        desc: Sequelize.STRING,
        active: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Products;
