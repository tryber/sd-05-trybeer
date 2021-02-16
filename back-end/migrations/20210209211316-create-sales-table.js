'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'sales',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        total_price: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        delivery_address: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        delivery_number: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        sale_date: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
          allowNull: false,
        },
        status: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      { timestamps: false },
    );
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('sales');
  },
};
