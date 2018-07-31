const config = require('../config/config');
const mongoose = require('mongoose');
const log = require('../utils/logger');

exports.connect = () => {
  mongoose.connect(config.mongoUrl);
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:')); // eslint-disable-line

  db.once('open', () => {
    // we're connected!
    log(`MongoDB connected on ${config.mongoUrl}`);
    log('###########################################################################');
  });
};
