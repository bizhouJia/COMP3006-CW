const Guest = require('../model/guest')

const express = require('express')
const router = express.Router()

// Get user list
router.get('/', async (req, res) => {
  const guests = await Guest.find()
  if (guests) {
    res.json({ code: 200, msg: 'Getting user list succeed!', data: guests })
  } else {
    res.json({ code: 201, msg: 'No data!' })
  }
})

// Delete user with id
router.delete('/:id', async (req, res) => {
  Guest.findOneAndDelete({ _id: req.params.id })
    .then(guest => res.json(guest))
    .catch(err => res.json(err))
})

// Add user
router.post('/add', (req, res) => {
  Guest.create(req.body, (err, guest) => {
    if (err) {
      console.log(err)
      res.json(err)
    } else {
      res.json(guest)
    }
  })
})

router.get('/:id', (req, res) => {
  console.log(req.params.id)
  Guest.findById(req.params.id)
    .then(guest => {
      res.json(guest)
    })
    .catch(err => {
      res.json(err)
    })
})

// Edit user information
router.put('/:id', (req, res) => {
  Guest.findOneAndUpdate({ _id: req.params.id },
    {
      $set: {
        'name': req.body.name,
        'phone': req.body.phone,
        'sex': req.body.sex,
        'idcard': req.body.idcard
      }
    }, {
    new: true
  })
    .then(guest => res.json(guest))
    .catch(err => res.json(err))
})


module.exports = router
