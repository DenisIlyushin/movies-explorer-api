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
  BASE_PATH,
  PORT,
  NODE_ENV,
} = require('./appConfig');

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
});

const app = express();

app.use(express.json());
app.use(cors);
app.use(helmet());
app.use(rateLimiter);
app.use(requestLogger);

app.use('/api', router);

app.use(errorLogger);
app.use(errors());
app.use((error, req, res, next) => {
  returnErrorAsResponse(error, res, {});
  next();
});

app.listen(PORT, () => {
  if (NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log('Ссылка на сервер');
    // eslint-disable-next-line no-console
    console.log(`${BASE_PATH}:${PORT}`);
  }
});
