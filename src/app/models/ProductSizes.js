import Sequelize, { Model } from "sequelize";

class ProductSize extends Model {
  static init(sequelize) {
    super.init(
      {
        size: Sequelize.STRING,
        quantity: Sequelize.INTEGER,
      },
      {
        sequelize,
        modelName: "productSizes",
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.products, { foreignKey: "product_id" });
  }
}

export default ProductSize;
