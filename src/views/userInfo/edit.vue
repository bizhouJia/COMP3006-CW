<template>
  <el-card class="app-container" shadow="always">
    <div slot="header">
      <span>Edit personal information</span>
    </div>
    <el-form ref="rules" :model="userInfo" :rules="rules" label-width="120px">
      <el-form-item label="Name" prop="name">
        <el-input v-model="userInfo.name" placeholder="Please enter name" />
      </el-form-item>
      <el-form-item label="Account" prop="account">
        <el-input v-model="userInfo.account" disabled placeholder="Please enter name" />
      </el-form-item>
      <el-form-item prop="sex" label="Gender">
        <el-radio v-model="userInfo.sex" :label="1">Male</el-radio>
        <el-radio v-model="userInfo.sex" :label="0">Female</el-radio>
      </el-form-item>
      <el-form-item prop="role" label="Role">
        <el-radio v-model="userInfo.role" :label="1" disabled>Admin</el-radio>
        <el-radio v-model="userInfo.role" :label="0" disabled>Guest</el-radio>
      </el-form-item>
      <el-form-item label="Status">
        <el-switch v-model="status" disabled></el-switch>
      </el-form-item>
      <el-form-item label="Phone number" prop="phone">
        <el-input v-model.number="userInfo.phone" placeholder="Please enter phone number" />
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input v-model="userInfo.email" placeholder="Please enter email address" />
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onSubmit">Submit</el-button>
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
        callback(new Error('Please enter phone number'));
      } else {
        let phone_reg = /^1[3|5|6|7|8]\d{9}$/
        if (!phone_reg.test(value)) {
          callback(new Error('Please enter correct phone number!'));
        }
        callback();
      }
    };
    var email_reg = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter email address'));
      } else {
        let email_reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        if (!email_reg.test(value)) {
          callback(new Error('Please enter correct email address!'));
        }
        callback();
      }
    };
    return {
      userInfo: {
        name: '',
        account: '',
        password: '',
        sex: '',
        phone: '',
        email: '',
        role: '',
      },
      status: true,
      rules: {
        name: [{ required: true, message: 'Please enter name', trigger: 'blur' }],
        phone: [{ validator: phone_reg, trigger: 'blur' }],
        email: [{ validator: email_reg, trigger: 'blur' }]
      },
      id: '',

      loading: false,
    }
  },
  mounted() {
    this.id = localStorage.getItem('id')
    // Get personal information
    this.$http.post('http://localhost:3000/User/getOne', { id: this.id }).then(res => {
      if (res.data.code == 200) {
        this.userInfo = res.data.data
      } else {
        this.$message.error(res.data.msg)
      }

    })
  },
  methods: {
    onSubmit() {
      this.$refs['rules'].validate(valid => {
        if (valid) {
          // Edit personal information
          this.$http.put('http://localhost:3000/User/' + this.id, this.userInfo).then(res => {
            if (res.data.code == 200) {
              localStorage.setItem('name', this.userInfo.name)
              this.$emit('name', 'modify')
              this.$message.success(res.data.msg)
              setTimeout(() => {
                this.$router.push('/userInfo')
              }, 800)
            } else {
              this.$message.error(res.data.msg)
            }
          })
        } else {
          this.$message({
            showClose: true,
            message: 'Please enter correct form!',
            type: 'error'
          })
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
