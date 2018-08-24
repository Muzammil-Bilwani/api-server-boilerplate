require('dotenv').load();

const env = process.env.NODE_ENV || 'development';

const config = {
  secretKey: process.env.SECRET_KEY,
  sealPass: process.env.SEAL_PASS,
};

config.dbUrl = env === 'production' ? process.env.DB_PROD_URL : process.env.DB_DEV_URL;

module.exports = config;
