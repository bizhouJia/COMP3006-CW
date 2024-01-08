const User = require('../model/user')

const express = require('express')
const router = express.Router()
const bcryptjs = require('bcryptjs');


var path = require("path");

var fs = require('fs');
var os = require('os');

var multer = require('multer');
// Temporary upload directory
var upload = multer({ dest: 'tmp_uploads/avatar' });

var upload_config = {
  "baseURL": "http://127.0.0.1:8080",
};


// Login
router.post('/login', async (req, res) => {
  const { account, password } = req.body
  const user = await User.findOne({ account })
  if (user) {
    // Test password
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) return res.json({ code: 201, msg: 'Password is wrong!' });

    // Go back to user information 0 guest 1 admin
    res.json({ code: 200, msg: 'Login succeed', status: user.status, id: user.id, name: user.name, token: new Date().getTime(), role: user.role })

  } else {
    res.json({ code: 201, msg: 'No such account!' })
  }
})

// Register
router.post('/register', async (req, res) => {
  const { account, password } = req.body
  const user = await User.findOne({ account })

  if (user) {
    // Account existed
    res.json({ code: 201, msg: 'The account has existed!' })

  } else {
    const salt = await bcryptjs.genSalt(10);
    // Hash password
    const bcPassword = await bcryptjs.hash(password, salt);

    const user = await User.create({
      account: account,
      password: bcPassword,
      role: 0,
      status: 1,
    });
    res.json({ code: 200, msg: 'Register succeed!', data: user })
  }
})

// Get user information with id
router.post('/getOne', async (req, res) => {
  const { id } = req.body
  const user = await User.findOne({ _id: id })
  if (user) {
    res.json({ code: 200, msg: 'Get succeed!', data: user })
  } else {
    res.json({ code: 201, msg: 'Get failed!' })
  }
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

// Edit user information
router.put('/:id', async (req, res) => {
  console.log(req.body)
  const user = await User.findOneAndUpdate({ _id: req.params.id },
    {
      $set: {
        'name': req.body.name,
        'sex': req.body.sex,
        'phone': req.body.phone,
        'email': req.body.email,
        'status': req.body.status
      }
    }, {
    new: true
  })

  if (user) {
    res.json({ code: 200, msg: 'Edit succeed!', data: user })
  } else {
    res.json({ code: 201, msg: 'Edit failed!' })
  }

})

// Update photo
router.post('/:id', async (req, res) => {
  console.log(req.body)
  const user = await User.findOneAndUpdate({ _id: req.params.id },
    {
      $set: {
        'avatar': req.body.avatar,
      }
    }, {
    new: true
  })

  if (user) {
    res.json({ code: 200, msg: 'Upload succeed!', data: user })
  } else {
    res.json({ code: 201, msg: 'Upload failed!' })
  }

})

// Edit password
router.post('/modifyPassword', async (req, res) => {
  const { id, oldPassword, newPassword } = req.body

  const user = await User.findOne({ _id: id })
  // Test password
  const validPassword = await bcryptjs.compare(oldPassword, user.password);
  if (!validPassword) return res.json({ code: 201, msg: 'Password is wrong!' });

  const salt = await bcryptjs.genSalt(10);
  // Hash password
  const bcPassword = await bcryptjs.hash(newPassword, salt);

  User.findOneAndUpdate({ _id: id },
    {
      $set: {
        'password': bcPassword
      }
    }, {
    new: true
  })
    .then(user => res.json({ code: 200, msg: 'Change succeed!' }))
    .catch(err => res.json(err))
})

// Get user list
router.get('/userList', async (req, res) => {
  const users = await User.find()
  if (users) {
    res.json({ code: 200, msg: 'Get succeed!', data: users })
  } else {
    res.json({ code: 201, msg: 'No data!' })
  }
})

// Delete user with id
router.delete('/:id', async (req, res) => {
  const user = await User.findOneAndDelete({ _id: req.params.id })
  if (user) {
    res.json({ code: 200, msg: 'Delete succeed!' })
  } else {
    res.json({ code: 201, msg: 'Delete failed!' })
  }
})

module.exports = router
