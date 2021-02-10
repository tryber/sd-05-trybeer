'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'sales_products',
      {
        sale_id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        product_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        quantity: {
          type: Sequelize.FLOAT,
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
