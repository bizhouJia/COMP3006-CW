<template>
  <el-card class="app-container" shadow="always">
    <div slot="header">
      <span>Add room type</span>
    </div>
    <el-form ref="roomInfo" :model="roomInfo" label-width="120px">
      <el-form-item :rules="[
        { required: true, message: 'Cannot be empty' }
      ]" prop="roomType" label="Room type">
        <el-input v-model="roomInfo.roomType" placeholder="Please enter type (Single/Double/Shared)" />
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: 'Cannot be empty' },
        { type: 'number', message: 'Must be number' }
      ]" label="Reservation cost" prop="price">
        <el-input v-model.number="roomInfo.price" type="number" placeholder="pounds/day" />
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: 'Cannot be empty' },
        { type: 'number', message: 'Must be number' }
      ]" label="Reservation discount" prop="discount">
        <el-input v-model.number="roomInfo.discount" type="number" placeholder="0-100(%)" />
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: 'Cannot be empty' },
        { type: 'number', message: 'Must be number' }
      ]" label="Room area" prop="area">
        <el-input v-model.number="roomInfo.area" type="number" placeholder="m²" />
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: 'Cannot be empty' },
      ]" label="With window or not">
        <el-radio v-model="roomInfo.window" :label="windowSwitch.has">With window</el-radio>
        <el-radio v-model="roomInfo.window" :label="windowSwitch.none">Without window</el-radio>
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: 'Cannot be empty' },
        { type: 'number', message: 'Must be number' }
      ]" label="Bed number" prop="bedNum">
        <el-input-number v-model="roomInfo.bedNum" :min="1" :max="10" label="Bed number" />
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: 'Cannot be empty' },
      ]" label="Bed size" prop="bedSize">
        <el-input v-model="roomInfo.bedSize" placeholder="eg. 1.2m*1.5m" />
      </el-form-item>
      <el-form-item label="Details">
        <el-input v-model="roomInfo.remark" type="textarea"
          placeholder="eg. wifi, hairdryer, luggage storage, air conditioning, private bathroom, ..." />
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
        roomType: '',
        area: '',
        window: '',
        bedNum: 0,
        bedSize: '',
        price: '',
        discount: '',
        remark: ''
      },
      loading: false,
      windowSwitch: {
        has: 1,
        none: 0
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.roomInfo.validate((valid) => {
        if (valid) {
          if (this.roomInfo.window.length == 0) {
            this.$message.error('Select with window or not')
            return false
          }
          this.loading = true
          this.$http.post('http://localhost:3000/RoomType/add', this.roomInfo).then(response => {
            if (response.data) {
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

<style scoped>
.line {
  text-align: center;
}
</style>
