const RoomType = require('../model/roomType')
// Room type router
const express = require('express')
const router = express.Router()

var path = require("path");

var fs = require('fs');
var os = require('os');

var multer = require('multer');
// Temporary upload directory
var upload = multer({ dest: 'tmp_uploads/' });

var upload_config = {
  "baseURL": "http://127.0.0.1:8080",
};

router.get('/', (req, res) => {
  RoomType.find().then(roomType => {
    res.json(roomType)
  }).catch(err => {
    res.json(err)
  })
})

router.post('/add', (req, res) => {

  let roomTypes = {
    room_type_name: req.body.roomType,
    price: req.body.price,
    discount: req.body.discount,
    area: req.body.area,
    window: req.body.window,
    bed_num: req.body.bedNum,
    bed_size: req.body.bedSize,
    remark: req.body.remark,
  }

  RoomType.create(roomTypes, (err, roomType) => {
    if (err) {
      console.log(err)
      res.json(err)
    } else {
      res.json(roomType)
    }
  })
})

// Provide file upload service
router.post("/upload", upload.single('file'), function (req, res, next) {
  var fileExtArray = req.file.originalname.split(".");
  var ext = fileExtArray[fileExtArray.length - 1];
  var targetPath = req.file.path + "." + ext;
  fs.rename(path.join(process.cwd(), "/" + req.file.path), path.join(process.cwd(), targetPath), function (err) {
    if (err) {
      return res.json(null, 400, "Upload failed!");
    }
    res.json({ "tmp_path": targetPath, "url": targetPath }, 200, "Upload succeed!");
  })
});


router.get('/:id', (req, res) => {
  RoomType.findById(req.params.id)
    .then(roomType => {
      res.json(roomType)
    })
    .catch(err => {
      res.json(err)
    })
})

router.put('/:id', (req, res) => {
  RoomType.findOneAndUpdate({ _id: req.params.id },
    {
      $set: {
        'room_type_name': req.body.room_type_name,
        'price': req.body.price,
        'discount': req.body.discount,
        'area': req.body.area,
        'window': req.body.window,
        'bed_num': req.body.bed_num,
        'bed_size': req.body.bed_size,
        'remark': req.body.remark
      }
    }, {
    new: true
  })
    .then(roomType => res.json(roomType))
    .catch(err => res.json(err))
})

router.delete('/:id', (req, res) => {

  RoomType.findOneAndDelete({
    _id: req.params.id
  })
    .then(roomType => res.json(roomType))
    .catch(err => res.json(err))
})

module.exports = router
