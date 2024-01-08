const mongoose = require('mongoose')
const Schema = mongoose.Schema
// Order
const OrderSchema = new Schema({
  orderType: {
    type: String,
    required: true,
  },
  roomType: {
    type: String,
    required: true,
  },
  roomNumber: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  orderDateRange: {
    type: Array,
    required: true
  },
  phone: {
    type: Number,
    required: true,
  },
  orderDays: {
    type: Number,
    required: true
  },
  orderCost: {
    type: Number,
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

module.exports = mongoose.model('Order', OrderSchema)
