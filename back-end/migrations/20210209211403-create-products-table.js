'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'products',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        price: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        url_image: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      { timestamps: false },
    );
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('products');
  },
};
