<template>
  <el-card class="app-container" shadow="always">
    <div slot="header">
      <span>Edit worker</span>
    </div>
    <el-form ref="worker" :model="worker" :rules="rules2" label-width="120px">
      <el-form-item prop="account" label="Account">
        <el-tag>{{ worker.account }}</el-tag>
      </el-form-item>
      <el-form-item label="Name" prop="name">
        <el-input v-model="worker.name" placeholder="Please enter name" />
      </el-form-item>
      <el-form-item label="Phone number" prop="phone">
        <el-input v-model.number="worker.phone" type="number" placeholder="Please enter phone number"
          style="width: 50%" />
      </el-form-item>
      <el-form-item prop="gender" label="Gender">
        <el-radio v-model="worker.gender" label="Male">Male</el-radio>
        <el-radio v-model="worker.gender" label="Female">Female</el-radio>
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input v-model="worker.email" />
      </el-form-item>
      <el-form-item label="Address" prop="address">
        <el-input v-model="worker.address" placeholder="Please enter address" />
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
      worker: {
        account: null,
        password: null,
        pass: null,
        name: null,
        phone: null,
        email: null,
        address: null,
        gender: null
      },
      loading: false,
      rules2: {
        account: [
          { required: true, message: 'Please enter name' },
          { min: 3, message: 'The length should be more than 3 letters', trigger: 'blur' }
        ],
        name: [
          { required: true, message: 'Cannot be empty' }
        ],
        phone: [
          { required: true, message: 'Cannot be empty' }
        ],
        gender: [
          { required: true, message: 'Cannot be empty' }
        ]
      }
    }
  },
  created: function () {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.$http.get(`http://localhost:3000/User/${this.$route.params.id}`).then(res => {
        this.worker = res.data
      })
    },
    onSubmit() {
      this.$refs.worker.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$http.put(`http://localhost:3000/User/${this.$route.params.id}`, this.worker).then(response => {
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
          }).catch(error => {
            this.loading = false
            this.showError()
            console.log(error)
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
