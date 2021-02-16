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

  table.associate = (models) => {
    models.product.belongsToMany(models.sale, {
      as: 'sale',
      foreignKey: 'product_id',
      otherKey: 'sale_id',
      through: table,
    });
    models.sale.belongsToMany(models.product, {
      as: 'product',
      foreignKey: 'sale_id',
      otherKey: 'product_id',
      through: table,
    });
  };

  return table;
};

module.exports = sales_product;
