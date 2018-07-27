// All the functions related to db goes here
const User = require('./user.schema');

const userDb = {}

userDb.getAllUsers = async () => {
    return User.find({}, { password: 0 });
};

userDb.findUser = async (params) => {
    return User.findOne(params).lean();
}

userDb.createUser  =async(params) => {
    return User.create(params);
}

module.exports = userDb;