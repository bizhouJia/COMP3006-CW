var crypto = require('crypto');

modifyPassword = function (req, res) {
  // hash password
  let t1 = crypto.createCipher('aes192', 'hotelAdmin');
  let hashPassword = t1.update(req.body.newPassword, 'utf8', 'hex');
  hashPassword += t1.final('hex');

  let updateSql = "UPDATE user SET user_password=? WHERE user_name=?";
  let updateData = [hashPassword, 'admin'];
  connection.query(updateSql, updateData, function (err) {
    if (err) {
      console.log(err)
      res.status(201).json({ code: 201, msg: 'Change failed!' })
    } else {
      res.status(200).json({ code: 200, msg: 'Change succeed!' })
    }
  })
}

module.exports = modifyPassword;