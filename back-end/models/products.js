const product = (sequelize, DataTypes) => {
  const table = sequelize.define(
    'product',
    {
      name: DataTypes.STRING,
      price: DataTypes.FLOAT,
      url_image: DataTypes.STRING,
    },
    { timestamps: false },
  );

  table.associate = (models) => {
    table.hasMany(models.sales_product, { foreignKey: 'product_id' })
  }
  return table;
};

module.exports = product;
