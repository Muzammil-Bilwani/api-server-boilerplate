const passwordHash = require('password-hash');
const UserDB = require('../user.model');
const auth = require('../../auth/auth.ctrl');
const messages = require('../../../config/messages');
const serverResponse = require('../../../utils/server-responses');

const initiate = {};

initiate.login = async (req, res) => {
  const user = await UserDB.findUser({ username: req.body.username });
  if (!user) {
    return serverResponse.sendError(res, messages.UNAUTHORIZED);
  }
  if (!passwordHash.verify(req.body.password, user.password)) {
    return serverResponse.sendSuccess(res, messages.IN_COMPLETE_REQUEST);
  }
  delete user.password;
  const data = {
    token: await auth.generateToken(user),
    info: user,
  };
  return serverResponse.sendSuccess(res, messages.SUCCESSFUL, data);
};

initiate.signUp = async (req, res) => {
  const params = {
    username: req.body.username,
    password: passwordHash.generate(req.body.password),
    fullname: req.body.fullname,
  };
  await UserDB.createUser(params);
  return serverResponse.sendSuccess(res, messages.SUCCESSFUL_CREATE);
};

module.exports = initiate;
