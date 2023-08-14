import Sequelize, { Model } from "sequelize";

class Solicitations extends Model {
  static init(sequelize) {
    super.init(
      {
        name_product: Sequelize.STRING,
        // price: Sequelize.FLOAT,
        // price_fake: Sequelize.FLOAT,
        // colors: Sequelize.ARRAY(Sequelize.STRING),
        // desc: Sequelize.STRING,
        // active: Sequelize.BOOLEAN,
      },
      {
        sequelize,
        modelName: "solicitations",
      }
    );

    return this;
  }

  //! Utilizado para vincular o ID da pessoa
  static associate(models) {
    this.belongsTo(models.users, { foreignKey: "user_id", as: "user" });
  }
}

export default Solicitations;
