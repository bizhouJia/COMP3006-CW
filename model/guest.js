const mongoose = require('mongoose')
const Schema = mongoose.Schema
// Check-in
const GuestSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  // 0 female 1 male
  sex: {
    type: Number,
    required: true
  },
  idcard: {
    type: String,
    required: true
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    }
  }
})

module.exports = mongoose.model('Guest', GuestSchema)
