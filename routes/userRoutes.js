const userRouter = require('express').Router();

const auth = require('../middleware/auth');
const {
  getCurrentUser,
  updateUser,
} = require('../controllers/user');
const { editCurrentUserValidator } = require('../utils/routesValidators');

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
  editCurrentUserValidator,
  updateUser,
);

module.exports = userRouter;
