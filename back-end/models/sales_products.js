const sale = (sequelize, DataTypes) => {
  const table = sequelize.define(
    'sales_product',
    {
      user_id: DataTypes.INTEGER,
      total_price: DataTypes.FLOAT,
      delivery_address: DataTypes.STRING,
      delivery_number: DataTypes.STRING,
      sale_date:DataTypes.DATE,
      status: DataTypes.STRING,
    },
    { timestamps: false },
  );

  return table;
};

module.exports = sale;