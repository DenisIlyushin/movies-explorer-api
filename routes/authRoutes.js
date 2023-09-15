const authRouter = require('express').Router();

const {
  signUp,
  signIn,
} = require('../controllers/auth');
const {
  signupValidator,
  signinValidator,
} = require('../utils/routesValidators');

const {
  AUTH_PATH = '',
} = process.env;

authRouter.post(
  `${AUTH_PATH}/signup`,
  signupValidator,
  signUp,
);
authRouter.post(
  `${AUTH_PATH}/signin`,
  signinValidator,
  signIn,
);

module.exports = authRouter;
