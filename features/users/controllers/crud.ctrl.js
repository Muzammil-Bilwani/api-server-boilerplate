const User = require('./../user.model.js');
const log = require('../../../utils/logger');
const serverMessages = require('../../../utils/server-responses');

const crudOpertations = {};

crudOpertations.getAllUsers = async (req, res) => {
  const users = await User.find({});
  log('Users Get');
  return res.status(200).send(serverMessages.success('Users Fetched', users));
};
