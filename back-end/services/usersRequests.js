module.exports = ({ mysqlConnection }) => {
  const { user } = mysqlConnection;

  const findUserbyEmailAndPassword = async ({ email, password }) => {
    const userData = await user.findOne({
      where: { email, password },
      attributes: ['id', 'name', 'email', 'role'],
    });
    if (!userData) return null;
    return userData.dataValues;
  };
  
  const createUser = async ({ name, email, password, role }) =>
    await user.create({ name, email, password, role });
  
  const findUserById = async (id) =>
    await user.findOne({
      where: { id },
      attributes: ['id', 'name', 'email', 'role'],
    });
  
  const updateUser = async (id, { name }) =>
    await user.update({ name }, { where: { id } });
  
  const excludeUser = (id) => user.destroy({where: {id}});

  return {
    findUserbyEmailAndPassword,
    createUser,
    findUserById,
    updateUser,
    excludeUser,
  };
};

// // prettier-ignore
// const excludeUser = async (id) => connection.query('DELETE FROM users WHERE id = ?', [id]);

