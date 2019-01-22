const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

// Allias to path initialization
require('./utils/allias')();

const serverResponses = require('@utils/server-responses');
const messages = require('@config/messages');
const database = require('@database/connection');


const app = express();


database.connect();


// uncomment after placing your favicon in /public

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Adding logger
require('@utils/api-logger')(app);

//  Requiring routes
require('./routes/index')(app);


// catch 404 and forward to error handler
app.use((req, res) =>
  serverResponses.sendError(res, messages.NOT_FOUND));

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.code || 500);
  return res.send(serverResponses.sendError(res, messages.NOT_FOUND));
});

module.exports = app;
