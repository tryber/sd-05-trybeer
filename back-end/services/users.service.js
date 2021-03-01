const rescue = require('express-rescue');
const jwt = require('../auth/jwt.auth');
const {
  LOGIN_SCHEMA,
  REGISTER_SCHEMA,
  UPDATE_SCHEMA,
  validate,
} = require('../utils/validation.utils');

module.exports = (mongoConnection, requests) => {
  // prettier-ignore
  const login = rescue(async (req, _res, next) => {
    validate(req.body)(LOGIN_SCHEMA);
    const messageCollection = await mongoConnection('messages');
    const user = await requests.findUserbyEmailAndPassword(req.body);
    if (!user) throw new Error('Email ou senha inválidos');
    const token = jwt.createToken(user);
    const dt = user.role === 'client'
      ? await messageCollection.find({
        $or: [
          { 'from.id': user.id },
          { 'to.id': user.id },
        ],
      }) : await messageCollection.find({});
    user.messages = await dt.toArray();
    req.data = { user, token };
    next();
  });

  // prettier-ignore
  const register = rescue(async (req, _res, next) => {
    validate(req.body)(REGISTER_SCHEMA);
    await requests.createUser(req.body);
    const user = await requests.findUserbyEmailAndPassword(req.body);
    const { password, ...userWithoutPassword } = req.body;
    req.data = { ...userWithoutPassword, token: jwt.createToken(user) };
    next();
  });

  const update = rescue(async (req, _res, next) => {
    // Primeira etapa
    validate(req.body)(UPDATE_SCHEMA);
    // Segunda etapa
    const { authorization } = req.headers;
    const { payload: { id } } = jwt.checkToken(authorization);
    // Terceira etapa
    await requests.updateUser(id, req.body);
    const user = await requests.findUserById(id);
    req.data = { ...user.dataValues, token: jwt.createToken(user.dataValues) };
    if (!user) throw new Error('Usuário bugado');
    next();
  });

  return {
    login,
    register,
    update,
  };
};
