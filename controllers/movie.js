const { StatusCodes } = require('http-status-codes');

const { handleRequestErrors } = require('../errors/handleRequestErrors');
const Movie = require('../models/movie');
const ForbiddenError = require('../errors/classes/forbiddenError');
const { movieMessages } = require('../errors/messages/controllersMessages');

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
          invalidRequestMessage: movieMessages.failedToCreateMovie,
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
  Movie.findById(req.params.id)
    .orFail()
    .then((movie) => {
      if (req.user._id !== movie.owner.toString()) {
        return Promise.reject(
          new ForbiddenError(movieMessages.forbiddenToDelete),
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
          notFoundMessage: movieMessages.noMovieFound,
          badRequestMessage: movieMessages.invalidMovieId,
        },
      );
    });
};
