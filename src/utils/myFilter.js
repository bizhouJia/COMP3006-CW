
const vFilter = {
  hasWindow: function (val) {
    if (val >= 1) return 'with windows'
    else return 'No'
  },
  formatDate: function (value) {
    var d = new Date(value)
    var year = d.getFullYear()
    var month = d.getMonth() + 1
    var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate()
    return year + '-' + month + '-' + day
  },
  addDate: function (date, days) {
    if (days === undefined || days === '') {
      days = 1
    }
    var d = new Date(date)
    d.setDate(d.getDate() + days)
    var year = d.getFullYear()
    var month = d.getMonth() + 1
    var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate()
    return year + '-' + month + '-' + day
  },
  getOrderStatus: function (val) {
    var status = ''
    switch (val) {
      case -1:
        status = 'Canceled'
        break
      case 0:
        status = 'Unpaid'
        break
      case 1:
        status = 'Paid'
        break
      case 2:
        status = 'Checked-in'
        break
      case -2:
        status = 'Order out of time'
        break
      case -3:
        status = 'Deleted'
        break
    }
    return status
  },
  getStatusColor(val) {
    var status = ''
    switch (val) {
      case -2:
        status = 'info'
        break
      case -1:
        status = ''
        break
      case 0:
        status = 'error'
        break
      case 1:
        status = 'success'
        break
      case 2:
        status = 'primary'
        break
      case -3:
        status = 'info'
        break
    }
    return status
  }
}

export default vFilter
