const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  StatusCodes,
} = require('http-status-codes');

const User = require('../models/user');
const { handleRequestErrors } = require('../errors/handleRequestErrors');
const { authMessages } = require('../errors/messages/controllersMessages');

const { JWT_SECRET = 'b1gSecret' } = process.env;

module.exports.signUp = (req, res, next) => {
  const {
    email, name, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => {
      res
        .status(StatusCodes.CREATED)
        .send({
          _id: user._id,
          email: user.email,
          name: user.name,
        });
    })
    .catch((error) => {
      handleRequestErrors(
        error,
        next,
        {
          invalidRequestMessage: authMessages.failedToCreateUser,
          conflictMessage: authMessages.userExists,
        },
      );
    });
};

module.exports.signIn = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCreds(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((error) => {
      handleRequestErrors(
        error,
        next,
        {
          unauthorizedMessage: authMessages.unauthorizedUser,
        },
      );
    });
};
