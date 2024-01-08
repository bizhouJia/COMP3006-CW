<template>
  <el-card class="app-container" shadow="always">
    <div slot="header">
      <span>Edit room type</span>
    </div>
    <el-form ref="form1" :model="form1" label-width="120px">
      <el-form-item :rules="[
        { required: true, message: 'Cannot be empty' }
      ]" prop="room_type_name" label="Room type">
        <el-input v-model="form1.room_type_name" placeholder="Please enter type (Single/Double/Shared)" />
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: 'Cannot be empty' },
        { type: 'number', message: 'Must be number' }
      ]" label="Reservation cost" prop="price">
        <el-input v-model.number="form1.price" type="number" placeholder="pounds/day" />
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: 'Cannot be empty' },
        { type: 'number', message: 'Must be number' }
      ]" label="Reservation discount" prop="discount">
        <el-input v-model.number="form1.discount" type="number" placeholder="0-100%" />
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: 'Cannot be empty' },
        { type: 'number', message: 'Must be number' }
      ]" label="Room area" prop="area">
        <el-input v-model.number="form1.area" type="number" placeholder="m²" />
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: 'Cannot be empty' },
      ]" label="With window or not">
        <el-radio v-model="form1.window" :label="windowSwitch.has">With window</el-radio>
        <el-radio v-model="form1.window" :label="windowSwitch.none">Without window</el-radio>
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: 'Cannot be empty' },
        { type: 'number', message: 'Must be number' }
      ]" label="Bed number" prop="bed_num">
        <el-input-number v-model="form1.bed_num" :min="1" :max="10" label="Bed number" />
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: 'Cannot be empty' },
      ]" label="Bed Size" prop="bed_size">
        <el-input v-model.number="form1.bed_size" placeholder="eg. 1.2m*1.5m" />
      </el-form-item>
      <el-form-item label="Details">
        <el-input v-model="form1.remark" type="textarea"
          placeholder="wifi, hairdryer, luggage storage, air conditioning, private bathroom, ..." />
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
  data() {
    return {
      form1: {
        room_type_name: '',
        area: null,
        window: null,
        bedNum: null,
        bedSize: null,
        price: null,
        discount: null,
        remark: null
      },
      loading: false,
      id: null,
      windowSwitch: {
        has: 1,
        none: 0
      }
    }
  },
  created: function () {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.id = this.$route.params.id
      if (this.id == null) {
        this.onCancel()
      }
      this.$http.get(`http://localhost:3000/RoomType/${this.id}`).then(res => {
        this.form1 = res.data
      })
    },
    onSubmit() {
      this.$refs.form1.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$http.put(`http://localhost:3000/RoomType/${this.id}`, this.form1).then(response => {
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

<style >
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
  -moz-appearance: textfield;
}
</style>