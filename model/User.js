const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  drink: {
    strength: {
      type: Number,
      min: 1,
      max: 5
    },
    Description: {
      type: String
    }
  },
  groups: {
    type: [[{
      id: {
        type: String
      },
      name: {
        type: String
      },
    }]],
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;