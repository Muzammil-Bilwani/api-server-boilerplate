// All the functions related to db goes here
const User = require('./user.schema');

const userDb = {};

userDb.getAllUsers = async () => User.find({}, { password: 0 });

userDb.findUser = async params => User.findOne(params).lean();

userDb.createUser = async params => User.create(params);

module.exports = userDb;
