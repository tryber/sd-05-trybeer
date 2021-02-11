'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'sales_products',
      {
        sale_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'sales',
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        product_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'products',
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
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
