<template>
  <div class="app-container">
    <el-form ref="form1" :model="form1" :rules="rules2" label-width="120px">
      <el-form-item prop="type" label="Reservation methods">
        <el-input v-model="form1.type" placeholder="Please input reservation methods" />
      </el-form-item>
      <el-form-item label="remark" prop="password">
        <el-input v-model="form1.password" type="password" placeholder="Please enter password" />
      </el-form-item>
      <el-form-item label="repeatPassword" prop="pass">
        <el-input v-model="form1.pass" type="password" placeholder="Repeat password" />
      </el-form-item>
      <el-form-item label="name" prop="name">
        <el-input v-model.number="form1.name" placeholder="Please enter your name" />
      </el-form-item>
      <el-form-item label="phoneNumber" prop="phone">
        <el-input v-model.number="form1.phone" type="number" placeholder="Please enter your phone number"
          style="width: 50%" />
      </el-form-item>
      <el-form-item prop="gender" label="gender">
        <el-radio v-model="form1.gender" label="male">Male</el-radio>
        <el-radio v-model="form1.gender" label="female">Female</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onSubmit()">Submit</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter password again!'))
      } else if (value !== this.form1.password) {
        callback(new Error('Password are not the same!'))
      } else {
        callback()
      }
    }
    return {
      form1: {
        username: null,
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
        username: [
          { required: true, message: 'Cannot be empty' }
        ],
        password: [
          { required: true, message: 'Cannot be empty' }
        ],
        pass: [
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
      this.$refs.form1.validate((valid) => {
        if (valid) {
          this.loading = true
          add(this.form1).then(response => {
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
        message: 'Submit failed',
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
