const user = (sequelize, DataTypes) => {
  const table = sequelize.define(
    'user',
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    { timestamps: false },
  );

  return table;
};

module.exports = user;
