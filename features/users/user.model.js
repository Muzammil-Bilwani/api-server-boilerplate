const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const User = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  name: {
    type: String,
    default: '',
  },
  admin: {
    type: Boolean,
    default: false,
  },
  resetToken: {
    type: String,
    default: '',
  },
  active: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});


module.exports = mongoose.model('User', User);
