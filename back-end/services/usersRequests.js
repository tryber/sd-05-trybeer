const { user } = require('../models');

const findUserbyEmailAndPassword = async ({ email, password }) => {
  const userData = await user.findOne({ where: { email, password } });
  if (!userData) return null
  return userData.dataValues
};

// const findUserbyEmailAndPassword = ({ email, password }) => connection
//   .query(
//     'SELECT id, name, email, role FROM users WHERE email = ? AND password = ?',
//     [email, password],
//   )
//   .then((array) => array[0][0]);
// prettier-ignore

module.exports = {
  findUserbyEmailAndPassword,
}