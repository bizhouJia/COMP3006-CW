const mongoose = require('mongoose')
const Schema = mongoose.Schema
// Room information
const RoomInfoSchema = new Schema({
  roomNumber: {
    type: Number,
    required: true,
    unique: true
  },
  roomType: {
    type: String,
    required: true
  },
  roomPrice: {
    type: Number,
    required: true
  },
  roomDiscount: {
    type: Number,
    required: true
  },
  // 0 unavailable 1 available 2 reserved 3 checked-in
  roomStatus: {
    type: Number,
    required: true
  },
  // Room photo
  roomPicture: {
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

module.exports = mongoose.model('RoomInfo', RoomInfoSchema)
