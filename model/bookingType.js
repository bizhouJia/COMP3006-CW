const mongoose = require('mongoose')
const Schema = mongoose.Schema
// Reservation methods
const BookingTypeSchema = new Schema({
  type: {
    type: String,
    required: true,
    unique: true
  },
  remark: {
    type: String
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    }
  }
})

module.exports = mongoose.model('BookingType', BookingTypeSchema)
