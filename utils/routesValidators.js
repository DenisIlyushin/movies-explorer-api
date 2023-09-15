const { celebrate, Joi } = require('celebrate');
const {
  validateEmail,
  validateRequiredString,
  validateRequiredShortString,
  validateRequiredNumber,
  validateRequiredUrl,
  validateMongoID,
} = require('./validators');

module.exports.signupValidator = celebrate({
  body: Joi.object().keys({
    email: validateEmail(),
    password: validateRequiredString(),
    name: validateRequiredShortString(),
  }),
});

module.exports.signinValidator = celebrate({
  body: Joi.object().keys({
    email: validateEmail(),
    password: validateRequiredString(),
  }),
});

module.exports.editCurrentUserValidator = celebrate({
  body: Joi.object().keys({
    name: validateRequiredShortString(),
    email: validateEmail(),
  }),
});

module.exports.createMovieValidator = celebrate({
  body: Joi.object().keys({
    country: validateRequiredString(),
    director: validateRequiredString(),
    duration: validateRequiredNumber(),
    year: validateRequiredString(),
    description: validateRequiredString(),
    image: validateRequiredUrl(),
    trailerLink: validateRequiredUrl(),
    thumbnail: validateRequiredUrl(),
    movieId: validateRequiredNumber(),
    nameRU: validateRequiredString(),
    nameEN: validateRequiredString(),
  }),
});

module.exports.deleteMovieValidator = celebrate({
  params: Joi.object().keys({
    id: validateMongoID(),
  }),
});
