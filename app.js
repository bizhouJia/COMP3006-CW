const express = require('express')
const app = express()
const mongoose = require('mongoose')
const config = require('./config/db')
const session = require('express-session')
const bodyParser = require('body-parser')
const index = require('./routes/index')
const user = require('./routes/user')
const roomType = require('./routes/roomType')
const roomInfo = require('./routes/roomInfo')
const bookingType = require('./routes/bookingType')
const guest = require('./routes/guest')
const order = require('./routes/order')
const logout = require('./routes/logout')

// Link MongoDB database
mongoose.connect(config.mongodb, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
mongoose.Promise = global.Promise

app.listen(3000, () => {
  console.log('Link succeed!')
})

// Enable socket.io
var server = http.createServer(app)
var io = require('socket.io')(server, { cors: true })
const ws = require('./config/chat');
ws.chat(io)

function broadcast(msg) {
  server.connection.forEach(item => {
    item.send(msg)
  })
}

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Access-Control-Allow-Headers', ' content-type')
  res.header('Content-Type', 'application/json;charset=utf-8')
  res.header('Access-Control-Allow-Credentials', true)
  next()
})

// Using session
app.use(session({
  secret: '12345',
  name: 'verCode_sessionId',
  // Set the maximum time of cookie
  cookie: { maxAge: 1000 * 60 * 30 },
  resave: true,
  saveUninitialized: false
}))

mongoose.connection.on('error', function (error) {
  console.log('Database linked failed: ' + error)
})

mongoose.connection.on('open', function () {
  console.log('Database linked succeed!')
})

bodyParser.json = function () {
  return undefined
}
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', index)
app.use('/RoomType', roomType)
app.use('/RoomInfo', roomInfo)
app.use('/BookingType', bookingType)
app.use('/Guest', guest)
app.use('/Order', order)
app.use('/User', user)
app.post('/logout', logout)

module.exports = app
