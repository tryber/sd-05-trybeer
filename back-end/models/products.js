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

  return table;
};

module.exports = product;
