const BookingType = require('../model/bookingType')
// Reservation methods
const express = require('express')
const router = express.Router()
// Router configuration: obtaining the preset method
router.get('/', (req, res) => {
  BookingType.find()
    .then(bookingType => {
      res.json(bookingType)
    }).catch(err => {
      res.json(err)
    })
})
// Add reservation methods
router.post('/add', (req, res) => {
  const { type, remark } = req.body
  BookingType.create({ type, remark }, (err, bookingType) => {
    if (err) {
      console.log(err)
      res.json(err)
    } else {
      res.json(bookingType)
    }
  })
})
// Get single reservation method with id
router.get('/:id', (req, res) => {
  BookingType.findById(req.params.id)
    .then(bookingType => {
      res.json(bookingType)
    })
    .catch(err => {
      res.json(err)
    })
})
// Update reservation method with id
router.put('/:id', (req, res) => {
  BookingType.findOneAndUpdate({ _id: req.params.id },
    {
      $set: {
        'type': req.body.type,
        'remark': req.body.remark
      }
    }, {
    new: true
  })
    .then(bookingType => res.json(bookingType))
    .catch(err => res.json(err))
})
// Delete reservation method with id
router.delete('/:id', (req, res) => {
  BookingType.findOneAndDelete({
    _id: req.params.id
  })
    .then(bookingType => res.json(bookingType))
    .catch(err => res.json(err))
})

module.exports = router
