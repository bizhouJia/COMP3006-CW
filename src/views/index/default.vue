<template>
  <div class="main">

    <el-carousel :interval="4000" type="card" height="300px" style="background-color: #fff;text-align: center;">
      <el-carousel-item v-for="item in swiperList" :key="item.id">
        <img :src="item.src" alt="">
      </el-carousel-item>
    </el-carousel>

    <div class="menu">
      <el-select v-model="value" @change="selectType" placeholder="Room type">
        <el-option label="All types" :value="0">
        </el-option>
        <el-option v-for="item in roomTypeList" :key="item._id" :label="item.room_type_name" :value="item._id">
          {{ item.room_type_name + '(' + item.price + ' pounds)' }}
        </el-option>
      </el-select>

      <el-select v-model="value1" @change="selectPrice" placeholder="Value range">
        <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>


    <div class="follow"><i class="el-icon-star-on"></i>We have these rooms</div>
    <div class="hotel">
      <div class="hotelItem" v-for="item in roomList">
        <div class="hotel_img"><img :src="item.roomPicture" alt=""></div>
        <div class="hotel_name">
          <div class="hl">
            <span>{{ item.roomType }}</span>
            <p class="price"><span class="y rmb">£</span>{{ item.roomPrice }}<span class="qi">+</span> <span
                style="display:inline-block; margin-top: -10px;"><el-tag effect="dark" size="mini"
                  type="danger">discounts{{
                    item.roomDiscount }}%</el-tag></span></p>
            <div class="order" :class="{ w: item.roomStatus != 1 ? true : false }" @click.stop="handleOrder(item)">
              {{ item.roomStatus != 1 ? 'Reserved' : 'Reserve now' }}</div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog title="Order" :visible.sync="dialogVisible" width="45%">

      <el-form ref="form" :rules="rules" :model="form" label-width="120px">
        <el-form-item :rules="[
          { required: true, message: 'Cannot be empty' }
        ]" label="Guest" prop="name">
          <el-input v-model="form.name" placeholder="Please enter guest name" />
        </el-form-item>
        <el-form-item label="Phone Number" prop="phone">
          <el-input v-model="form.phone" placeholder="Please enter guest phone number" />
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
          { required: true, message: 'Cannot be empty' },
          { type: 'number', message: 'Must be number' }
        ]" label="Order cost" prop="orderCost">
          <span v-if="form.orderCost != 0">
            {{ perPrice + '*(100-' + discount + ')/100 *' + this.form.orderDays + ' = ' + form.orderCost }}
          </span>
          <span v-else>{{ '￥ 0' }}</span>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="onSubmit">Yes</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'hotel_category',
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
      swiperList: [
        {
          id: 0,
          src: require('@/assets/images/swiper1.jpg')
        },
        {
          id: 1,
          src: require('@/assets/images/swiper2.jpg')
        },
        {
          id: 2,
          src: require('@/assets/images/swiper3.jpg')
        },
        {
          id: 3,
          src: require('@/assets/images/swiper4.jpg')
        }
      ],

      roomTypeList: [],
      value: '',
      confidtion1: 0,
      confidtion2: 0,

      options2: [{
        value: '0',
        label: 'All(pounds/day)'
      }, {
        value: '2',
        label: '100 ~ 200 pounds'
      }, {
        value: '3',
        label: '200 ~ 300 pounds'
      }, {
        value: '4',
        label: '300 ~ 400 pounds'
      }, {
        value: '5',
        label: '400 ~ 500 pounds'
      },
      {
        value: '6',
        label: '500+'
      }],
      value1: '',

      roomList: [],
      list: [],
      dialogVisible: false,


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
      rules: {
        phone: [
          { required: true, message: 'Cannot be empty' },
          { validator: phone_reg, trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getRoomType()
    this.getRoomList()
  },

  methods: {

    // Get room type
    getRoomType() {
      this.$http.get('http://localhost:3000/roomType/').then(res => {
        this.roomTypeList = res.data
      })
    },
    // Get room list
    getRoomList() {
      this.$http.get('http://localhost:3000/roomInfo/').then(res => {
        this.roomList = res.data
        for (var i = 0; i < this.roomList.length; i++) {
          this.roomTypeList.forEach(item => {
            if (item._id == this.roomList[i].roomType) {
              this.roomList[i]._roomId = item._id
              this.roomList[i].roomType = item.room_type_name
            }
          })
        }
        this.list = this.roomList
      })
    },
    selectType(val) {

      this.confidtion1 = val
      console.log(this.confidtion1, this.confidtion2, this.list)

      this.roomTypeList.forEach(i => {
        if (i._id == val) {
          this.value = i.room_type_name + '(' + i.price + ' pounds)'
        }
      })

      let priceColl = [, 99999, 200, 300, 400, 500]
      let a = []

      this.confidtion2 = parseInt(this.confidtion2)
      if (this.confidtion1 == 0) {
        a = this.list
        if (this.confidtion2 != 0) {
          if (this.confidtion2 != 6)
            a = a.filter(item => item.roomPrice < priceColl[this.confidtion2] && item.roomPrice > (priceColl[this.confidtion2] - 100))
          else
            a = a.filter(item => item.roomPrice > (priceColl[this.confidtion2 - 1]))
        }
      } else {
        this.list.forEach(item => {
          if (item._roomId == this.confidtion1) {
            a.push(item)
          }
        })

        if (this.confidtion2 != 0) {
          if (this.confidtion2 != 6)
            a = a.filter(item => item.roomPrice < priceColl[this.confidtion2] && item.roomPrice > (priceColl[this.confidtion2] - 100))
          else
            a = a.filter(item => item.roomPrice > (priceColl[this.confidtion2 - 1]))
        }
      }

      this.roomList = a

    },
    selectPrice(val) {


      this.confidtion2 = val
      console.log(this.confidtion1, this.confidtion2, this.list)

      let priceColl = [, 99999, 200, 300, 400, 500]
      let a = []

      if (this.confidtion2 == 0) {
        a = this.list
        if (this.confidtion1) {
          a = a.filter(item => item._roomId == this.confidtion1)
        }
      } else {
        if (this.confidtion2 != 6) {
          a = this.list.filter(item => item.roomPrice < priceColl[this.confidtion2] && item.roomPrice > (priceColl[this.confidtion2] - 100))
          if (this.confidtion1) {
            a = a.filter(item => item._roomId == this.confidtion1)
          }
        } else {
          a = this.list.filter(item => item.roomPrice > priceColl[this.confidtion2 - 1])
          if (this.confidtion1) {
            a = a.filter(item => item._roomId == this.confidtion1)
          }
        }
      }

      this.roomList = a
    },

    // Order
    handleOrder(val) {
      console.log(val)
      if (val.roomStatus != 1) {
        this.$message.error('This room has been reserved, please select other rooms')
        return false
      }
      this.form.roomNumber = val.roomNumber
      this.form.roomType = val._roomId
      this.dialogVisible = true

      let id = localStorage.getItem('id')
      this.$http.post('http://localhost:3000/user/getOne', { id }).then(res => {
        console.log(res.data)
        this.form.name = res.data.data.name
        this.form.phone = res.data.data.phone
      })
    },

    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.orderType = 'Internet'
          this.loading = true
          this.$http.post('http://localhost:3000/Order/add', this.form).then(res => {
            if (res) {
              this.$message({
                message: 'Submit succeed',
                type: 'success'
              })
              this.$http.post('http://localhost:3000/RoomInfo/info', { 'roomNumber': this.form.roomNumber })
                .then(r => {
                  this.loading = false
                  this.getRoomList()
                  setTimeout(() => { this.dialogVisible = false }, 800)
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


    calcDays() {
      this.form.orderDays = (this.form.orderDateRange[1].getTime() - this.form.orderDateRange[0].getTime()) / 1000 / 60 / 60 / 24

      let price = ''
      if (this.form.roomNumber) {
        this.roomList.forEach(i => {
          if (i.roomNumber == this.form.roomNumber) {
            this.perPrice = i.roomPrice
            this.discount = i.roomDiscount
            price = i.roomPrice * (100 - i.roomDiscount) / 100
          }
        })
      }
      this.form.orderCost = price * this.form.orderDays
    },


  }
}
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  background-color: #F4F5F6;

  .menu {
    margin-top: 20px;
  }

  .follow {
    margin: 10px;
    margin-top: 20px;
    color: #00afc7;
  }

  // Room list
  .hotel {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;

    .hotelItem {
      flex: 33.33%;
      max-width: 370px;
      cursor: pointer;
      padding: 15px;

      .hotel_img {
        width: 100%;
        height: 250px;
        border-radius: 8px;
        overflow: hidden;
        border-bottom: 1px solid #f1f1f1;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .hotel_name {
        width: 100%;
        height: 90px;
        padding: 10px;
        position: relative;

        .hl {
          span {
            display: block;
          }

          span:nth-child(2) {
            color: #00afc7;
            display: inline-block;
            margin-top: 10px;
          }

          span:nth-child(3) {
            display: inline-block;
            margin-top: 10px;
            margin-left: 20px;
            font-size: 14px;
          }

          .price {
            line-height: 32px;
            font-size: 22px;
            color: #ff714a;

            .y {
              display: inline-block;
              font-size: 14px;
              margin-right: 1px;
            }

            .rmb {
              font-family: arial;
            }

            .qi {
              font-size: 12px;
              margin-left: 1px;
            }
          }

          .order {
            width: 80px;
            height: 35px;
            text-align: center;
            font-size: 14px;
            line-height: 35px;
            color: #fff;
            border-radius: 30px;
            background-color: #2681FF;
            position: absolute;
            bottom: 0px;
            right: 10px;
          }

          .w {
            opacity: 0.6;
          }

        }

      }
    }

    .hotelItem:hover {
      background-color: #fff;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.16);
    }

    .hotelItem:hover .hotel_img {
      border-radius: 0;
    }

    .hotelItem:hover .hotel_img img {
      transform: scale(1.036);
      transition: 0.2s;
    }
  }

  .pages {
    margin-top: 20px;
  }

}
</style>
