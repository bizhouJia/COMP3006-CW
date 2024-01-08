const RoomInfo = require('../model/roomInfo')

const express = require('express')
const router = express.Router()
// Get all room information
router.get('/', (req, res) => {
  RoomInfo.find().then(roomInfo => {
    res.json(roomInfo)
  }).catch(err => {
    res.json(err)
  })
})
// Get single room information
router.post('/roomNumber', (req, res) => {
  console.log(req.body)
  RoomInfo.find({
    roomType: req.body.roomType,
    roomStatus: 1,
  }).then(roomInfo => {
    console.log(roomInfo)
    res.json(roomInfo)
  }).catch(err => {
    res.json(err)
  })
})
// Add room
router.post('/add', async (req, res) => {
  console.log(req.body)
  const room = await RoomInfo.findOne({ roomNumber: req.body.roomNumber })
  if (room) {
    res.json({ code: 201, msg: 'This room number has existed!' })
    return false
  }
  RoomInfo.create(req.body, (err, roomInfos) => {
    if (err) {
      console.log(err)
      res.json(err)
    } else {
      res.json({ code: 200, msg: 'Add succeed!' })
    }
  })
})
// 
router.get('/:id', (req, res) => {
  RoomInfo.findById(req.params.id)
    .then(roomInfo => {
      res.json(roomInfo)
    })
    .catch(err => {
      res.json(err)
    })
})

router.put('/:id', (req, res) => {
  RoomInfo.findOneAndUpdate({ _id: req.params.id },
    {
      $set: {
        'roomNumber': req.body.roomNumber,
        'roomType': req.body.roomType,
        'roomPrice': req.body.roomPrice,
        'roomPicture': req.body.roomPicture,
        'roomDiscount': req.body.roomDiscount,
        'roomStatus': req.body.roomStatus,
        'bed_size': req.body.bed_size,
        'remark': req.body.remark
      }
    }, {
    new: true
  })
    .then(roomType => res.json(roomType))
    .catch(err => res.json(err))
})
// Edit room status 0 unavailable 1 available 2 reserved 3 checked-in

router.post('/info', async (req, res) => {
  const roomOne = await RoomInfo.findOne({ roomNumber: req.body.roomNumber })
  const room = await RoomInfo.findOneAndUpdate({ _id: roomOne._id },
    {
      $set: {
        'roomStatus': 2
      }
    }, {
    new: true
  })

  if (room) {
    res.json({ code: 200, msg: 'Edit succeed!' })
  } else {
    res.json({ code: 201, msg: 'Edit failed!' })
  }

})
// Delete room
router.delete('/:id', (req, res) => {
  RoomInfo.findOneAndDelete({
    _id: req.params.id
  })
    .then(roomInfo => res.json(roomInfo))
    .catch(err => res.json(err))
})

module.exports = router
