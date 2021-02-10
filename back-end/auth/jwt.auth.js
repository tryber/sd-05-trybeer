const jwt = require('jsonwebtoken');
require('dotenv').config();

const config = {
  expiresIn: '5d',
  algorithm: 'HS256',
};

const SECRET = process.env.SECRET || 'bla';

const createToken = (payload) => jwt.sign({ payload }, SECRET, config);
const checkToken = (token) => jwt.verify(token, SECRET);

module.exports = {
  createToken,
  checkToken,
};
