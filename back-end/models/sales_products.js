const sales_product = (sequelize, DataTypes) => {
  const table = sequelize.define(
    'sales_product',
    {
      sale_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    { timestamps: false },
  );

  return table;
};

module.exports = sales_product;
