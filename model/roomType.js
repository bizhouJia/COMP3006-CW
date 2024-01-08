const mongoose = require('mongoose')
const Schema = mongoose.Schema
// Room type
const RoomTypeSchema = new Schema({
  room_type_name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  area: {
    type: Number,
    required: true
  },
  // 0 no windows 1 with windows
  window: {
    type: Number,
    required: true
  },
  bed_num: {
    type: Number,
    required: true
  },
  bed_size: {
    type: String,
    required: true
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    }
  },
  remark: {
    type: String
  }
})

module.exports = mongoose.model('RoomType', RoomTypeSchema)
