require('dotenv').config();

const {
  PORT = 3000,
  NODE_ENV = 'dev',
  PATH,
  DB_URL,
} = process.env;

const BASE_PATH = NODE_ENV === 'production'
  ? PATH
  : 'http://localhost';
const MONGODB_URL = NODE_ENV === 'production'
  ? DB_URL
  : 'mongodb://localhost:27017/bitfilmsdb';

module.exports = {
  BASE_PATH,
  MONGODB_URL,
  PORT,
  NODE_ENV,
};
