<template>
  <el-card class="app-container" shadow="always">
    <div slot="header">
      <span>Add user information</span>
    </div>
    <el-form ref="guest" :model="guest" :rules="rules2" label-width="120px">
      <el-form-item label="Name" prop="name">
        <el-input v-model="guest.name" placeholder="Please enter user name" />
      </el-form-item>
      <el-form-item label="Phone Number" prop="phone">
        <el-input v-model.number="guest.phone" placeholder="Please enter user phone number" />
      </el-form-item>
      <el-form-item prop="sex" label="Gender">
        <el-radio v-model="guest.sex" :label="1">Male</el-radio>
        <el-radio v-model="guest.sex" :label="0">Female</el-radio>
      </el-form-item>
      <el-form-item label="IDcard" prop="idcard">
        <el-input v-model="guest.idcard" placeholder="Please enter user id card number" />
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
    var phone_reg = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter user phone number'));
      } else {
        let phone_reg = /^1[3|5|6|7|8]\d{9}$/
        if (!phone_reg.test(value)) {
          callback(new Error('Please enter correct phone number!'));
        }
        callback();
      }
    };
    var idcard_reg = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter user id card number'));
      } else {
        let idcard_reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)$/
        if (!idcard_reg.test(value)) {
          callback(new Error('Please enter correct id card number!'));
        }
        callback();
      }
    };
    return {
      guest: {
        name: '',
        phone: null,
        sex: null,
        idcard: null,
      },
      loading: false,
      rules2: {
        name: [
          { required: true, message: 'Cannot be empty' }
        ],
        phone: [
          { required: true, message: 'Cannot be empty' },
          { validator: phone_reg, trigger: 'blur' }
        ],
        sex: [
          { required: true, message: 'Cannot be empty' },
        ],
        idcard: [
          { required: true, message: 'Cannot be empty' },
          { validator: idcard_reg, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.guest.validate((valid) => {
        if (valid) {
          this.loading = true

          this.$http.post('http://localhost:3000/Guest/add', this.guest).then(res => {
            if (res.data) {
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
