const mongoose = require('mongoose')
// hash password
const bcryptjs = require('bcryptjs');

// User information
const Schema = mongoose.Schema

const UserSchema = new Schema({
  account: {
    type: String,
    required: true
  },
  name: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    required: true
  },
  // 0 female 1 male
  sex: {
    type: Number,
    default: 0
  },
  // user photo
  avatar: {
    type: String,
    default: ''
  },
  // 0 guest 1 admin
  role: {
    type: Number,
    required: true
  },
  // 0 disable 1 enable
  status: {
    type: Number,
    required: true
  },
  phone: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  idcard: {
    type: String,
    default: 'No'
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    }
  }
})
const User = mongoose.model('User', UserSchema)

module.exports = User
