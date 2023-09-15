const {
  StatusCodes,
} = require('http-status-codes');

const User = require('../models/user');
const { handleRequestErrors } = require('../errors/handleRequestErrors');
const { userMessages } = require('../errors/messages/controllersMessages');

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
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
          notFoundMessage: userMessages.noUserFound,
          badRequestMessage: userMessages.invalidUserId,
        },
      );
    });
};

module.exports.updateUser = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    {
      new: true,
      runValidators: true,
    },
  )
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
          notFoundMessage: userMessages.noUserFound,
          badRequestMessage: userMessages.invalidUserId,
        },
      );
    });
};
