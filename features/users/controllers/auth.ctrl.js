const jwt = require('jsonwebtoken');
const Iron = require('iron');
const passwordHash = require('password-hash');

const User = require('./../user.model.js');
const log = require('../../../utils/logger');
const serverMessages = require('../../../utils/server-responses');
const config = require('../../../config/config');

const authOperations = {};

const generateToken = async (user) => {
  const ironSealedUser = await Iron.seal(user, config.sealPass);
  return jwt.sign(ironSealedUser, config.secretKey);
};


authOperations.login = async (req, res) => {
  const user = await User.findOne({
    username: req.body.username,
  });
  log('Users Get');
  if (!user) {
    return res.status(400).send(serverMessages.error('You are not a part of our system'));
  }
  if (!passwordHash.verify(req.body.password, user.password)) {
    return res.status(401).send(serverMessages.error('Wrong Credentials'));
  }

  delete user.password;
  const data = {
    token: generateToken(user),
    data: user,
  };

  return res.status(200).send(serverMessages.success('You are in.', data));
};

authOperations.signUp = async (req, res) => {
  const password = passwordHash.generate(req.body.password);
  const addedUser = await User.create({
    username: req.body.username,
    password,
    fullname: req.body.fullname,
  });

  log(addedUser);

  return res.status(200).send(serverMessages.success('You are registered'));
};

authOperations.verifyUser = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (!token) {
    return res.status(400).send(serverMessages.error('No Token Provided'));
  }

  jwt.verify(token, config.secretKey).then(
    (decoded) => {
      req._user = decoded;
      next();
    },
    () => res.status(401).send(serverMessages.error('User Verification Error', null)),
  );
};


module.exports = authOperations;
