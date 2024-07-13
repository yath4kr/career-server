const Joi = require("joi");

const postUserSchema = Joi.object({
  name: Joi.string().trim().required(),
  username: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
  email: Joi.string().email().trim().required(),
  mobile: Joi.number().integer().min(1000000000).max(9999999999).required(),
});

const postAuthSchema = Joi.object({
  id: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
});

module.exports = { postAuthSchema, postUserSchema };
