const { celebrate, Joi } = require('celebrate');
const userRouter = require('express').Router();

const auth = require('../middleware/auth');
const {
  getCurrentUser,
  updateUser,
} = require('../controllers/user');
const {
  validateShortString,
} = require('../utils/validators');

const {
  USER_PATH = '/users',
} = process.env;

userRouter.get(
  `${USER_PATH}/me`,
  auth,
  getCurrentUser,
);
userRouter.patch(
  `${USER_PATH}/me`,
  auth,
  celebrate({
    body: Joi.object().keys({
      name: validateShortString(),
      about: validateShortString(),
    }),
  }),
  updateUser,
);

module.exports = userRouter;
