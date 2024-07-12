const Joi = require("joi");

const postUserSchema = Joi.object({
  name: Joi.string().trim().required(),
  username: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
  email: Joi.string().email().trim().required(),
  mobile: Joi.number().integer().min(1000000000).max(9999999999).required(),
});

module.exports = { postUserSchema };
