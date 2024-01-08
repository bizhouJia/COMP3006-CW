<template>
  <el-card class="app-container" shadow="always">
    <div slot="header">
      <span>Add worker</span>
    </div>
    <el-form ref="worker" :model="worker" :rules="rules2" label-width="120px">
      <el-form-item prop="Account" label="Account">
        <el-input v-model="worker.account" placeholder="Please enter account for login" />
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input v-model="worker.password" type="password" placeholder="Please enter password" />
      </el-form-item>
      <el-form-item label="Repeat Password" prop="pass">
        <el-input v-model="confirmPassword" type="password" placeholder="Please repeat password" />
      </el-form-item>
      <el-form-item label="Name" prop="name">
        <el-input v-model="worker.name" placeholder="Please enter name" />
      </el-form-item>
      <el-form-item label="Phone number" prop="phone">
        <el-input v-model.number="worker.phone" placeholder="Please enter phone number" style="width: 50%" />
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
import crypto from 'crypto'

export default {
  components: { ElCard },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please repeat password'))
      } else if (value !== this.worker.password) {
        callback(new Error('Password are not the same!'))
      } else {
        callback()
      }
    }
    return {
      worker: {
        account: null,
        password: null,
        name: null,
        phone: null,
        email: '',
        address: '',
        gender: null,
        role: 'user',
        is_removed: false
      },
      confirmPassword: null,
      loading: false,
      rules2: {
        account: [
          { required: true, message: 'Please enter name' },
          { min: 3, message: 'The length should be more than 3 letters', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Cannot be empty' }
        ],
        confirmPassword: [
          { required: true, validator: validatePass, trigger: 'blur' }
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
  methods: {
    onSubmit() {
      if (!this.worker.password) {
        this.$message({
          message: 'Please enter pasword',
          type: 'error'
        })
        return
      }
      if (!this.confirmPassword) {
        this.$message({
          message: 'Please repeat password',
          type: 'error'
        })
        return
      }
      if (this.confirmPassword !== this.worker.password) {
        this.$message({
          message: 'Password are not the same!',
          type: 'error'
        })
        return
      }
      this.$refs.worker.validate((valid) => {
        if (valid) {
          this.loading = true
          this.worker.password = crypto.createHash('md5').update(this.worker.password).digest('hex')
          this.$http.post('http://localhost:3000/User/add', this.worker).then(response => {
            console.log(response)
            if (response.data && !response.data.code) {
              this.$message({
                message: 'Submit succeed!',
                type: 'success'
              })
              this.loading = false
              setTimeout(this.onCancel(), 20000)
            } else {
              this.showError(response.data.msg)
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
    showError(msg) {
      this.$message({
        message: 'Submit failed ' + msg,
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
