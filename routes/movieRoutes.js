const { celebrate, Joi } = require('celebrate');
const movieRouter = require('express').Router();

const auth = require('../middleware/auth');
const {
  validateRequiredString,
  validateRequiredNumber,
  validateRequiredUrl,
  validateMongoID,
} = require('../utils/validators');
const {
  createMovie,
  getAllMovies,
  deleteMovie,
} = require('../controllers/movie');

const {
  MOVIE_PATH = '/movies',
} = process.env;

movieRouter.post(
  `${MOVIE_PATH}`,
  auth,
  celebrate({
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
  }),
  createMovie,
);
movieRouter.get(
  `${MOVIE_PATH}`,
  auth,
  getAllMovies,
);

movieRouter.delete(
  `${MOVIE_PATH}/:id`,
  auth,
  celebrate({
    params: Joi.object().keys({
      id: validateMongoID(),
    }),
  }),
  deleteMovie,
);

module.exports = movieRouter;
