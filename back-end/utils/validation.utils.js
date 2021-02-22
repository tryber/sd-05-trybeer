const Joi = require('@hapi/joi');

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

const validate = (data) => (schema) => {
  const { error } = schema.validate(data);
  if (error) throw new Error(error);
};

module.exports = {
  LOGIN_SCHEMA,
  REGISTER_SCHEMA,
  UPDATE_SCHEMA,
  validate,
};
