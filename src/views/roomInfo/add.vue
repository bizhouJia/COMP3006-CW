<template>
  <el-card class="app-container" shadow="always">
    <div slot="header">
      <span>Add room</span>
    </div>
    <el-form ref="roomInfo" :model="roomInfo" label-width="120px">
      <el-form-item :rules="[
        { required: true, message: 'Cannot be empty' }
      ]" label="Room number" prop="roomNumber">
        <el-input v-model.number="roomInfo.roomNumber" placeholder="Please enter room number" />
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: 'Cannot be empty' }
      ]" label="Room type">
        <el-select v-model="roomInfo.roomType" @change="selectRoom" placeholder="Please select room type">
          <el-option v-for="t in typeList" :label="t.room_type_name" :value="t._id" :key="t._id">
            {{ t.room_type_name + '(' + t.price + ' pounds)' }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: 'Cannot be empty' },
        { type: 'number', message: 'Must be number' }
      ]" label="Value" prop="roomPrice">
        <el-input v-model.number="roomInfo.roomPrice" disabled placeholder="Please enter cost" type="number" />
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: 'Cannot be empty' },
        { type: 'number', message: 'Must be number' }
      ]" label="Discount" prop="roomDiscount">
        <el-input v-model.number="roomInfo.roomDiscount" disabled placeholder="0-100 (%)" type="number" />
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: 'Cannot be empty' },
      ]" label="Room status">
        <el-radio-group v-model="roomInfo.roomStatus">
          <el-radio :label="statusList.unavailable">Unavailable</el-radio>
          <el-radio :label="statusList.available">Available</el-radio>
          <el-radio :label="statusList.occupied">Reserved</el-radio>
          <el-radio :label="statusList.inUse">Checked-in</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="Room picture" :rules="[
        { required: true, message: 'Cannot be empty' },
      ]">
        <el-upload action="http://localhost:3000/RoomType/upload" list-type="picture-card" :on-success="successUpload"
          :limit="1">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>

      </el-form-item>

      <el-form-item label="Details">
        <el-input v-model="roomInfo.remark" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onSubmit()">Submit</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import ElCard from 'element-ui/packages/card/src/main'
export default {
  components: { ElCard },
  data() {
    return {
      roomInfo: {
        roomNumber: null,
        roomType: null,
        roomPrice: null,
        roomPicture: '',
        roomDiscount: null,
        roomStatus: null,
        remark: null,
      },
      loading: false,
      typeList: null,
      statusList: {
        unavailable: 0,
        available: 1,
        occupied: 2,
        inUse: 3
      },

      dialogImageUrl: '',
      dialogVisible: false,

    }
  },
  created: function () {
    this.fetchData()
  },
  methods: {
    successUpload(val) {
      console.log(val)
      this.roomInfo.roomPicture = val.url
    },

    fetchData() {
      this.$http.get('http://localhost:3000/RoomType/').then(res => {
        this.typeList = res.data
      })
    },
    selectRoom(e) {
      if (e == null) return
      this.roomInfo.roomType = e
      this.typeList.forEach(item => {
        if (e === item._id) {
          this.roomInfo.roomPrice = item.price
          this.roomInfo.roomDiscount = item.discount
          this.roomInfo.remark = item.remark
        }
      })
    },
    onSubmit() {
      this.$refs.roomInfo.validate((valid) => {
        if (valid) {
          if (this.roomInfo.roomPicture.length == 0) {
            this.$message.error('Please upload photos')
            return false
          }
          this.loading = true
          this.$http.post('http://localhost:3000/RoomInfo/add', this.roomInfo).then(res => {
            if (res.data.code == 200) {
              this.$message({
                message: 'Submit succeed!',
                type: 'success'
              })
              this.loading = false
              setTimeout(this.onCancel(), 2000)
            } else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              })
              this.loading = false
            }
          })
        } else {
          this.loading = false
          return false
        }
      })
    },
    onCancel() {
      this.$router.back()
    }
  }
}
</script>

<style scoped></style>
