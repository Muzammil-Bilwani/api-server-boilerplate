const morgan = require('morgan');

// Loging Body
const addBodyToken = () => {
  morgan.token('body', req => `\n${JSON.stringify(req.body)}\n--`);
};

const loggerTemplate = (tokens, req, res) =>
  [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.body(req, res),
  ].join(' ');

const apiLogger = (app) => {
  addBodyToken();
  app.use(morgan(loggerTemplate));
};

module.exports = apiLogger;
