<template>
  <el-card class="app-container" shadow="always">
    <div slot="header">
      <span>Change password</span>
    </div>
    <el-form ref="rules" label-width="120px">
      <el-form-item label="Password" prop="oldPassword">
        <el-input v-model="oldPassword" type="password" placeholder="Please enter password" />
      </el-form-item>
      <el-form-item label="New password" prop="newPassword">
        <el-input v-model="newPassword" type="password" placeholder="Please enter new password" />
      </el-form-item>
      <el-form-item label="Please repeat password" prop="rePassword">
        <el-input v-model="rePassword" type="password" placeholder="Please repeat password" />
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
    return {
      oldPassword: '',
      newPassword: '',
      rePassword: '',
      id: '',

      loading: false,
    }
  },
  mounted() {
    this.id = localStorage.getItem('id')
  },
  methods: {
    showRPwd() {
      if (this.rpwdType === 'password') {
        this.rpwdType = ''
      } else {
        this.rpwdType = 'password'
      }
    },
    onSubmit() {
      if (this.oldPassword.trim().length == 0 || this.newPassword.trim().length == 0 || this.rePassword.trim().length == 0) {
        this.$message.error('Please enter correct form!')
        return false
      }

      if (this.newPassword != this.rePassword) {
        this.$message.error('Password are not the same')
        return false
      }

      // Change password
      this.$http.post('http://localhost:3000/User/modifyPassword', {
        id: this.id,
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      }).then(res => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg)
        } else {
          this.$message.error(res.data.msg)
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
