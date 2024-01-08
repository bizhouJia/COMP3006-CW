var logout = function (req, res) {
  if (req.session.destroy()) {
    res.status(200).json({ code: 200, msg: 'Exit succeed!' })
  } else {
    res.status(201).json({ code: 201, msg: 'Exit failed!' })
  }
}

module.exports = logout
