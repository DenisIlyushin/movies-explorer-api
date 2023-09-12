const { celebrate, Joi } = require('celebrate');
const authRouter = require('express').Router();

const {
  signUp,
  signIn,
} = require('../controllers/auth');

const {
  validateEmail,
  validateRequiredString,
  validateShortString,
} = require('../utils/validators');

const {
  AUTH_PATH = '',
} = process.env;

authRouter.post(
  `${AUTH_PATH}/signup`,
  celebrate({
    body: Joi.object().keys({
      email: validateEmail(),
      password: validateRequiredString(),
      name: validateShortString(),
    }),
  }),
  signUp,
);
authRouter.post(
  `${AUTH_PATH}/signin`,
  celebrate({
    body: Joi.object().keys({
      email: validateEmail(),
      password: validateRequiredString(),
    }),
  }),
  signIn,
);

module.exports = authRouter;
