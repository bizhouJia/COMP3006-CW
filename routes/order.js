const Order = require('../model/order')
// Order information
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  Order.find().then(order => {
    res.json(order)
  }).catch(err => {
    res.json(err)
  })
})

router.post('/add', (req, res) => {
  Order.create(req.body, (err, order) => {
    if (err) {
      console.log(err)
      res.json(err)
    } else {
      res.json(order)
    }
  })
})

router.get('/:id', (req, res) => {
  Order.findById(req.params.id)
    .then(order => {
      res.json(order)
    })
    .catch(err => {
      res.json(err)
    })
})

router.put('/:id', (req, res) => {
  Order.findOneAndUpdate({ _id: req.params.id },
    {
      $set: {
        'orderType': req.body.orderType,
        'roomType': req.body.roomType,
        'name': req.body.name,
        'orderDate': req.body.orderDate,
        'phone': req.body.phone,
        'orderDays': req.body.orderDays,
        'orderCost': req.body.orderCost,
        'remark': req.body.remark
      }
    }, {
    new: true
  })
    .then(order => res.json(order))
    .catch(err => res.json(err))
})

router.delete('/:id', (req, res) => {

  Order.findOneAndDelete({
    _id: req.params.id
  })
    .then(order => res.json(order))
    .catch(err => res.json(err))
})

module.exports = router
