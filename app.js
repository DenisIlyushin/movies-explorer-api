const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middleware/logger');
const cors = require('./middleware/cors');
const rateLimiter = require('./middleware/rateLimiter');
const router = require('./routes/index');
const { returnErrorAsResponse } = require('./errors/returnErrorAsResponse');

const {
  MONGODB_URL,
  PORT,
} = require('./appConfig');

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
});

const app = express();

app.use(express.json());
app.use(cors);
app.use(helmet());
app.use(requestLogger);
app.use(rateLimiter);

app.use('/api', router);

app.use(errorLogger);
app.use(errors());
app.use((error, req, res, next) => {
  returnErrorAsResponse(error, res, {});
  next();
});

app.listen(PORT);
