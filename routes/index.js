const router = require('express').Router();

const auth = require('../middleware/auth');
const authRouter = require('./authRoutes');
const userRouter = require('./userRoutes');
const movieRouter = require('./movieRoutes');
const NotFoundError = require('../errors/classes/notFoundError');
const { routesMessages } = require('../errors/messages/routesMessages');

router.use('/', authRouter);
router.use('/', userRouter);
router.use('/', movieRouter);
router.use(auth);
router.use('*', (req, res, next) => {
  next(new NotFoundError(routesMessages.unknown));
});

module.exports = router;
