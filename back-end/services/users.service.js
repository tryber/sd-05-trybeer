const Joi = require('@hapi/joi');
const rescue = require('express-rescue');
const jwt = require('../auth/jwt.auth');

module.exports = (requests) => {
  // prettier-ignore
  const LOGIN_SCHEMA = Joi.object({
    email: Joi.string().email()
      .required(),
    password: Joi.string().min(3)
      .max(64)
      .required(),
  });
  // prettier-ignore
  const REGISTER_SCHEMA = Joi.object({
    email: Joi.string().email()
      .required(),
    name: Joi.string().min(3)
      .max(64)
      .required(),
    password: Joi.string().min(3)
      .max(64)
      .required(),
    role: Joi.string().required(),
  });

  const UPDATE_SCHEMA = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().min(3).max(64).required(),
  });

  // prettier-ignore
  const login = rescue(async (req, _res, next) => {
    console.log(req.body);
    const { error } = LOGIN_SCHEMA.validate(req.body);
    const user = await requests.findUserbyEmailAndPassword(req.body);
    // console.log(user);
    if (error) throw new Error(error);
    if (!user) throw new Error('Email ou senha inválidos');
    req.data = { user, token: jwt.createToken(user) };
    next();
  });

  // prettier-ignore
  const register = rescue(async (req, _res, next) => {
    const { error } = REGISTER_SCHEMA.validate(req.body);
    if (error) throw new Error(error);
    await requests.createUser(req.body);
    const user = await requests.findUserbyEmailAndPassword(req.body);
    req.data = { token: jwt.createToken(user) };
    next();
  });

  const update = rescue(async (req, _res, next) => {
    // Primeira etapa
    const { error } = UPDATE_SCHEMA.validate(req.body);
    if (error) throw new Error(error);
    // Segunda etapa
    const { authorization } = req.headers;
    const {
      payload: { id },
    } = jwt.checkToken(authorization);
    // Terceira etapa
    await requests.updateUser(id, req.body);
    const user = await requests.findUserById(id);
    req.data = { token: jwt.createToken(user.dataValues) };
    if (!user) throw new Error('Usuário bugado');
    next();
  });

  return {
    login,
    register,
    update,
  };
};
