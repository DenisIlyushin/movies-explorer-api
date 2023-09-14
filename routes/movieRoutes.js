const movieRouter = require('express').Router();

const auth = require('../middleware/auth');
const {
  createMovie,
  getAllMovies,
  deleteMovie,
} = require('../controllers/movie');
const {
  createMovieValidator,
  deleteMovieValidator,
} = require('../utils/routesValidators');

const {
  MOVIE_PATH = '/movies',
} = process.env;

movieRouter.post(
  `${MOVIE_PATH}`,
  auth,
  createMovieValidator,
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
  deleteMovieValidator,
  deleteMovie,
);

module.exports = movieRouter;
