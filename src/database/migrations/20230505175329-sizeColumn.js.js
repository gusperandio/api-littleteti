module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("products", "sizes", {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true,
    });
  },

  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await Promise.all([queryInterface.changeColumn("products", "sizes")]);
  },
};
