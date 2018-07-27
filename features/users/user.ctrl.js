const passwordHash = require('password-hash');

const auth = require('../auth/auth.ctrl');
const User = require('./user.schema');
const messages = require('../../config/messages');
const serverResponse = require('../../utils/server-responses');

const user = {};

user.login = async (req, res) => {
  let user = await User.findOne({
    username: req.body.username,
  }).lean();
  if (!user) {
    return serverResponse.sendError(res, messages.UNAUTHORIZED);
  }
  if (!passwordHash.verify(req.body.password, user.password)) {
    return serverResponse.sendSuccess(res, messages.IN_COMPLETE_REQUEST, data);;
  }
  delete user.password;
  const data = {
    token: await auth.generateToken(user),
    info: user,
  };
  return serverResponse.sendSuccess(res, messages.SUCCESSFUL, data);
};

user.signUp = async (req, res) => {
  const password = passwordHash.generate(req.body.password);
  const addedUser = await User.create({
    username: req.body.username,
    password,
    fullname: req.body.fullname,
  });
  return serverResponse.sendSuccess(res, messages.SUCCESSFUL_CREATE);
};
user.getAllUsers = async (req, res) => {
  const users = await User.find({}, { password: 0 });
  return serverResponse.sendSuccess(res, messages.SUCCESSFUL, users);
};

module.exports = user;
