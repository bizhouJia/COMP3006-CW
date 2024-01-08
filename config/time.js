const Time = {
    dateTime() {
        return new Date().getTime()
    },
    getLineCount(concacts) {
        return concacts.body.length
    },

}

exports = module.exports = Time