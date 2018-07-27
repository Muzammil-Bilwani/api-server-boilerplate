require('dotenv').load();
const env = process.env.NODE_ENV || 'development';

const config = {
  secretKey: process.env.SECRET_KEY,
  sealPass: process.env.SEAL_PASS,
};

config.mongoUrl = env === 'production' ? process.env.MONGO_PROD_URL : process.env.MONGO_DEV_URL;

module.exports = config;