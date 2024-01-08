<template>
  <el-card class="app-container" shadow="always">
    <div slot="header">
      <span>Add order</span>
    </div>
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item :rules="[
        { required: true, message: 'Cannot be empty' }
      ]" label="Guest" prop="name">
        <el-input v-model="form.name" placeholder="Please enter guest name" />
      </el-form-item>
      <el-form-item label="Phone Number" prop="phone">
        <el-input v-model="form.phone" placeholder="Please enter phone number" />
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: 'Cannot be empty' }
      ]" label="Room type">
        <el-select v-model="form.roomType" @change="selectRoomType" clearable placeholder="Please select room type">
          <el-option v-for="rt in roomTypeList" :label="rt.room_type_name" :value="rt._id" :key="rt._id">
            {{ rt.room_type_name + '(' + rt.price + ' pounds)' }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: 'Cannot be empty' }
      ]" label="Room number">
        <el-select v-model="form.roomNumber" clearable placeholder="Please select room number">
          <el-option v-for="item in list" :label="item.roomNumber" :value="item.roomNumber" :key="item.roomNumber">
            {{ item.roomNumber }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: 'Cannot be empty' }
      ]" label="Check-in date">
        <el-date-picker v-model="form.orderDateRange" type="daterange" start-placeholder="Begin" end-placeholder="End"
          @change="calcDays" />
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: 'Cannot be empty' }
      ]" label="Days" prop="orderDays">
        {{ form.orderDays + ' days' }}
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: 'Cannot be empty' }
      ]" label="Reservation method">
        <el-select v-model="form.orderType" placeholder="Please select reservation methods">
          <el-option v-for="t in orderTypeList" :label="t.type" :value="t.type" :key="t.type">
            {{ t.type }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: 'Cannot be empty' },
        { type: 'number', message: 'Must be number' }
      ]" label="Order costs" prop="orderCost">
        <span v-if="form.orderCost != 0">
          {{ perPrice + '*(100-' + discount + ')/100 *' + this.form.orderDays + ' = ' + form.orderCost }}
        </span>
        <span v-else>{{ '£ 0' }}</span>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onSubmit()">Submit</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>

export default {
  name: 'Add',
  data() {
    var phone_reg = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter phone number'));
      } else {
        let phone_reg = /^1[3|5|6|7|8]\d{9}$/
        if (!phone_reg.test(value)) {
          callback(new Error('Please enter correct phone number!'));
        }
        callback();
      }
    };
    return {
      form: {
        orderType: null,
        roomType: null,
        roomNumber: null,
        name: null,
        phone: null,
        orderDateRange: null,
        orderDays: 0,
        orderCost: 0,
      },
      count: 0,
      orderDateRange: null,
      loading: false,
      roomTypeList: [],
      orderTypeList: [],
      roomNumberList: [],
      list: [],
      perPrice: '',
      discount: '',


      rules: {
        phone: [
          { required: true, message: 'Cannot be empty' },
          { validator: phone_reg, trigger: 'blur' }
        ]
      }
    }
  },
  created: function () {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.$http.get('http://localhost:3000/BookingType/').then(res => {
        this.orderTypeList = res.data
      })
      this.$http.get('http://localhost:3000/RoomType/').then(res => {
        this.roomTypeList = res.data
      })
      this.$http.get('http://localhost:3000/RoomInfo/').then(res => {
        this.roomNumberList = res.data
      })

    },

    selectRoomType(val) {
      this.list = []
      this.form.roomNumber = ''
      this.roomNumberList.forEach(i => {
        if (i.roomStatus == 1 && i.roomType == val) {
          this.list.push(i)
        }
      })


    },
    calcDays() {
      this.form.orderDays = (this.form.orderDateRange[1].getTime() - this.form.orderDateRange[0].getTime()) / 1000 / 60 / 60 / 24

      let price = ''
      if (this.form.roomNumber) {
        this.roomNumberList.forEach(i => {
          if (i.roomNumber == this.form.roomNumber) {
            this.perPrice = i.roomPrice
            this.discount = i.roomDiscount
            price = i.roomPrice * (100 - i.roomDiscount) / 100
          }
        })
      }
      this.form.orderCost = price * this.form.orderDays
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$http.post('http://localhost:3000/Order/add', this.form).then(res => {
            if (res) {
              this.$message({
                message: 'Submit succeed!',
                type: 'success'
              })
              this.$http.post('http://localhost:3000/RoomInfo/info', { 'roomNumber': this.form.roomNumber })
                .then(r => {
                  console.log(r)
                  this.loading = false
                  setTimeout(this.onCancel(), 2000)
                })
            } else {
              this.showError()
              this.loading = false
            }
          })
        } else {
          this.loading = false
          return false
        }
      })
    },
    showError() {
      this.$message({
        message: 'Submit failed!',
        type: 'error'
      })
    },
    onCancel() {
      this.$router.back()
    }
  }
}
</script>

<style scoped></style>
