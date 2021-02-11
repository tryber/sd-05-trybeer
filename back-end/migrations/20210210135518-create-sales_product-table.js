'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'sales_products',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        sale_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        product_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      { timestamps: false },
    );
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('sales_products');
  },
};
