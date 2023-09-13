const { StatusCodes } = require('http-status-codes');

const { handleRequestErrors } = require('../errors/handleRequestErrors');
const Movie = require('../models/movie');
const ForbiddenError = require('../errors/classes/forbiddenError');

module.exports.createMovie = (req, res, next) => {
  Movie.create({
    ...req.body,
    owner: req.user._id,
  })
    .then((movie) => {
      res
        .status(StatusCodes.CREATED)
        .send(movie);
    })
    .catch((error) => {
      handleRequestErrors(
        error,
        next,
        {
          invalidRequestMessage: 'Не удалось создать карточку места',
        },
      );
    });
};

module.exports.getAllMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id }, null, { sort: { createdAt: -1 } })
    .then((movies) => {
      res.status(StatusCodes.OK).send(movies);
    })
    .catch((error) => {
      handleRequestErrors(error, next);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const movieId = req.params.id;
  Movie.findById(movieId)
    .orFail()
    .then((movie) => {
      if (req.user._id !== movie.owner.toString()) {
        return Promise.reject(
          new ForbiddenError('Нельзя удалять чужие фильмы'),
        );
      }
      return Movie.findByIdAndRemove(movie._id)
        .then((deletedMovie) => {
          res
            .status(StatusCodes.OK)
            .send(deletedMovie);
        });
    })
    .catch((error) => {
      handleRequestErrors(
        error,
        next,
        {
          notFoundMessage: `Фильм с ID ${movieId} не найден`,
          badRequestMessage: `Фильм с с ID ${movieId} не валиден`,
        },
      );
    });
};
