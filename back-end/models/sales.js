const sale = (sequelize, DataTypes) => {
  const table = sequelize.define(
    'sale',
    {
      user_id: DataTypes.INTEGER,
      total_price: DataTypes.FLOAT,
      delivery_address: DataTypes.STRING,
      delivery_number: DataTypes.STRING,
      sale_date: DataTypes.DATE,
      status: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { timestamps: false },
  );

  table.associate = (models) => {
    table.hasMany(models.sales_product, { foreignKey: 'sale_id' });
  };

  return table;
};

module.exports = sale;
