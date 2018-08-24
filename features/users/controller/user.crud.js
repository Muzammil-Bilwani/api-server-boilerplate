const UserDB = require('../user.model');
const messages = require('@config/messages');
const serverResponse = require('@utils/server-responses');

const user = {};

user.getAllUsers = async (req, res) => {
  const users = await UserDB.getAllUsers();
  return serverResponse.sendSuccess(res, messages.SUCCESSFUL, users);
};

module.exports = user;
