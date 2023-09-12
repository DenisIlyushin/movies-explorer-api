const {
  StatusCodes,
} = require('http-status-codes');

const User = require('../models/user');
const {handleRequestErrors} = require('../errors/handleRequestErrors');

module.exports.getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => {
      res
        .status(StatusCodes.OK)
        .send(user);
    })
    .catch((error) => {
      handleRequestErrors(
        error,
        next,
        {
          notFoundMessage: `Пользователь с ID ${userId} не найден`,
          badRequestMessage: `Пользователь с ID ${userId} не валиден`,
        },
      );
    });
};

module.exports.updateUser = (req, res, next) => {
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    {
      name: req.body.name,
      email: req.body.email
    },
    {
      new: true,
      runValidators: true,
      upsert: false,
    })
    .orFail()
    .then((user) => {
      res
        .status(StatusCodes.OK)
        .send(user);
    })
    .catch((error) => {
      handleRequestErrors(
        error,
        next,
        {
          notFoundMessage: `Пользователь с ID ${userId} не найден`,
          badRequestMessage: `Пользователь с ID ${userId} не валиден`,
        },
      );
    });
};
