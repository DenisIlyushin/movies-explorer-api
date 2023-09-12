const router = require('express').Router();

const authRouter = require('./authRoutes');
const userRouter = require('./userRoutes');
const movieRouter = require('./movieRoutes');
const NotFoundError = require('../errors/classes/notFoundError');

router.use('/', authRouter);
router.use('/', userRouter);
router.use('/', movieRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('URI не найден'));
});

module.exports = router;
