<template>
  <el-card class="app-container" shadow="always">
    <div slot="header">
      <span>Edit room</span>
    </div>
    <el-form ref="form1" :model="form1" label-width="120px">
      <el-form-item :rules="[
        { required: true, message: 'Cannot be empty' }
      ]" label="Room number" prop="roomNumber">
        <el-input v-model.number="form1.roomNumber" placeholder="Please enter room number" />
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: 'Cannot be empty' }
      ]" label="Room type">
        <el-select v-model="form1.roomType" @change="selectRoom" placeholder="Please enter room type">
          <el-option v-for="t in typeList" :label="t.room_type_name" :value="t._id" :key="t._id">
            {{ t.room_type_name + '(' + t.price + ' pounds)' }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: 'Cannot be empty' },
        { type: 'number', message: 'Must be number' }
      ]" label="Value" prop="roomPrice">
        <el-input v-model.number="form1.roomPrice" disabled type="number" />
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: 'Cannot be empty' },
        { type: 'number', message: 'Must be number' }
      ]" label="Discount" prop="roomDiscount">
        <el-input v-model.number="form1.roomDiscount" disabled type="number" />
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: 'Cannot be empty' },
      ]" label="Room status">
        <el-radio-group v-model="form1.roomStatus">
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
        <el-input v-model="form1.remark" type="textarea" />
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
      form1: {
        roomId: null,
        roomNumber: null,
        roomType: null,
        typeId: null,
        roomPrice: null,
        roomPicture: null,
        roomDiscount: null,
        roomStatus: null,
        remark: null
      },
      loading: false,
      typeList: null,
      id: null,
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
      this.form1.roomPicture = val.url
    },

    fetchData() {
      this.id = this.$route.params.id
      if (this.id == null) {
        this.onCancel()
      }
      this.$http.get('http://localhost:3000/RoomType/').then(response => {
        this.typeList = response.data
      }).then(() => {
        this.$http.get(`http://localhost:3000/RoomInfo/${this.id}`).then(res => {
          this.form1 = res.data
          this.typeList.forEach(item => {
            if (item._id == this.form1.roomType) {
              this.form1.roomType = item.room_type_name
            }
          })
        })
      })
    },
    selectRoom(e) {
      if (e == null) return
      this.form1.roomType = e
      this.typeList.forEach(item => {
        if (e === item._id) {
          this.form1.roomPrice = item.price
          this.form1.roomDiscount = item.discount
          this.form1.remark = item.remark
        }
      })
    },
    onSubmit() {
      this.$refs.form1.validate((valid) => {
        if (valid) {
          this.typeList.forEach(item => {
            if (this.form1.roomType === item.room_type_name) {
              this.form1.roomType = item._id
            }
          })
          this.loading = true
          this.$http.put(`http://localhost:3000/RoomInfo/${this.id}`, this.form1).then(response => {
            if (response) {
              this.$message({
                message: 'Submit succeed!',
                type: 'success'
              })
              this.loading = false
              setTimeout(this.onCancel(), 20000)
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
