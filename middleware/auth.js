const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/classes/unauthorizedError');
const { authMessages } = require('../errors/messages/middlewaresMessages');

const {
  JWT_SECRET = 'b1gSecret',
} = process.env;

module.exports = (req, res, next) => {
  let payload;
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    return next(
      new UnauthorizedError(
        authMessages.noToken,
      ),
    );
  }
  const token = authorization.replace('Bearer ', '');
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(
      new UnauthorizedError(
        authMessages.badToken,
      ),
    );
  }
  req.user = payload;
  return next();
};
