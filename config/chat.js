var Tools = require('./time')
// contacts list
var contacts = {
    body: [],
    onLine: {}
}


var chat = (io) => {
    io.on('connection', function (socket) {
        // Login
        socket.on('LOGIN', function (res) {
            console.log('Got message: ', res);
            // socket ID
            let id = socket.id
            console.log('id=====>:', id);

            let body = res.body
            let nickname = body.nickname
            // Change time
            body.message.time = Tools.dateTime()

            contacts.onLine[body.id] = socket;

            setTimeout(() => {
                socket.emit('contacts', {
                    code: 2,
                    body: contacts.body
                })

                body.notify = nickname + ' enters the chat room'
                io.emit('onLine', {
                    code: 2,
                    body: body,
                    lineCount: Tools.getLineCount(contacts) + 1
                })

                delete body.notify
                contacts.body.push(body)
            }, 1000)


        })

        socket.on('disconnect', function () {
            let id = socket.id
            Object.keys(contacts.onLine).forEach(key => {
                var so = contacts.onLine[key];
                if (socket.id == so.id) {
                    var user = null;
                    contacts.body.map((item, k) => {
                        if (item.id == key) {
                            user = item;
                            contacts.body.splice(k, 1)
                        }
                    })
                    delete contacts.onLine[key]
                    io.emit('onLine', {
                        code: 1,
                        body: {
                            id: user.id,
                            avatar: user.avatar,
                            nickname: user.nickname,
                            notify: user.nickname + ' leaves the chat room'
                        },
                        lineCount: Tools.getLineCount(contacts)
                    })
                }
            });

        })

        socket.on('MESSAGE', function (message) {

            try {
                let type = message.type
                let body = message.body
                let gotoId = body.gotoId
                let fromId = body.fromId
                message.type = 'server-message'
                message.body.type = 'server'

                if (type == 'group-message') {
                    io.emit('MESSAGE', message)
                } else {
                    message.id = fromId
                    message.body.fromId = gotoId
                    message.body.gotoId = fromId
                    contacts.onLine[gotoId].emit('MESSAGE', message)
                }
            } catch (e) {
                console.log(e)
            }

        })


    })
}

module.exports = {
    chat
}
