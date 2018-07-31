const messages = require('../../config/messages');
const jwt = require('jsonwebtoken');
const Iron = require('iron');
const serverResponse = require('../../utils/server-responses');
const config = require('../../config/config');

const authOperations = {};

authOperations.generateToken = async (user) => {
  const ironSealedUser = await Iron.seal(user, config.sealPass, Iron.defaults);
  return jwt.sign(ironSealedUser, config.secretKey);
};

authOperations.verifyUser = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (!token) {
    return serverResponse.sendError(res, messages.AUTHENTICATION_FAILED);
  }
  jwt.verify(token, config.secretKey, (error, decoded) => {
    if (error) return serverResponse.sendError(res, messages.BAD_REQUEST);
    req._user = decoded;
    next();
  });
};

authOperations.unseal = async (req, res, next) => {
  req._user = await Iron.unseal(req._user, config.sealPass, Iron.defaults);
  next();
};

module.exports = authOperations;
