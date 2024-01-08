<template>
  <div id="login">
    <div class="login-wrap">
      <div class="login-wrap-left">
        <img src="../../assets/images/login-left.jpg" alt="login">
      </div>
      <div :class="[bForgetPassowrd === true ? 'login-trans' : '']" class="login-wrap-right">
        <img class="login-logo" src="../../assets/images/logo.png" alt="">
        <div class="login-wrap-form">
          <el-form ref="loginRules" :model="loginRulesForm" :rules="loginRules" label-width="100px"
            class="demo-loginRules">
            <el-form-item prop="account" class="login-name">
              <el-input v-model="loginRulesForm.account" placeholder="Please enter username" />
            </el-form-item>
            <el-form-item class="login-password" prop="password">
              <el-input :type="pwdType" v-model="loginRulesForm.password" name="password"
                placeholder="Please enter password" @keyup.enter.native="login" />
              <span class="show-pwd" @click="showPwd">
                <svg-icon v-if="pwdType == 'password'" icon-class="eye" />
                <svg-icon v-else icon-class="eye-open" />
              </span>
            </el-form-item>
            <div class="login-btn-div" @click="login">
              <el-button :loading="bBtnLoginStatus" class="login-btn in" type="primary">Login</el-button>
            </div>
            <el-form-item class="login-operation">
              <span class="forget-password" @click="toRegister">Register</span>
            </el-form-item>
          </el-form>
        </div>
      </div>

      <div :class="[bForgetPassowrd === true ? 'forget' : '']" class="forget-password-wrap">
        <h3>Register</h3>
        <div class="login-wrap-form">
          <el-form ref="rules" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
            <el-form-item class="login-name" prop="account">
              <el-input v-model="ruleForm.account" placeholder="Please enter username" />
            </el-form-item>
            <el-form-item class="login-password" prop="password">
              <el-input :type="pwdType" v-model="ruleForm.password" name="password" placeholder="Please enter password" />
              <span class="show-pwd" @click="showPwd">
                <svg-icon v-if="pwdType == 'password'" icon-class="eye" />
                <svg-icon v-else icon-class="eye-open" />
              </span>
            </el-form-item>
            <el-form-item class="login-password" prop="repassword">
              <el-input :type="rpwdType" v-model="ruleForm.repassword" name="repassword"
                placeholder="Please repeat password" @keyup.enter.native="register" />
              <span class="show-pwd" @click="showRPwd">
                <svg-icon v-if="rpwdType == 'password'" icon-class="eye" />
                <svg-icon v-else icon-class="eye-open" />
              </span>
            </el-form-item>
            <div class="forget-btn-div" style="text-align: center">
              <el-button class="login-btn" type="defalut" @click="toRegister">Back to login</el-button>
              <el-button :loading="bBtnLoginStatus" class="login-btn" type="primary"
                @click="register">Register</el-button>
            </div>
          </el-form>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import store from '@/store'
// import crypto from 'crypto'
export default {
  name: 'Login',
  data() {
    return {
      ruleForm: {
        account: '',
        password: '',
        repassword: ''
      },
      loginRulesForm: {
        account: '',
        password: ''
      },
      loginRules: {
        account: [
          { required: true, message: 'Please enter username', trigger: 'blur' },
          { min: 3, message: 'The length should be more than 3 letters', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please enter password', trigger: 'blur' },
          { min: 5, message: 'The length should be more than 5 letters', trigger: 'blur' }
        ]
      },
      rules: {
        account: [
          { required: true, message: 'Please enter username', trigger: 'blur' },
          { min: 3, message: 'The length should be more than 3 letters', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please enter password', trigger: 'blur' },
          { min: 5, message: 'The length should be more than 5 letters', trigger: 'blur' }
        ],
        repassword: [
          { required: true, message: 'Please repeat password', trigger: 'blur' },
          { min: 5, message: 'The length should be more than 5 letters', trigger: 'blur' }
        ],
      },
      pwdType: 'password',
      rpwdType: 'password',
      bBtnLoginStatus: false,
      bForgetPassowrd: false,
      nSendTime: 60,
      bModifyBtnStatus: false,
      bSendTime: null
    }
  },
  mounted() {

  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    showRPwd() {
      if (this.rpwdType === 'password') {
        this.rpwdType = ''
      } else {
        this.rpwdType = 'password'
      }
    },
    login() {
      this.$refs['loginRules'].validate(valid => {
        if (valid) {

          this.$http.post('http://localhost:3000/User/login', this.loginRulesForm).then(res => {
            let message = res.data.msg
            let type = ''

            if (res.data.code === 200) {
              type = 'success'
              window.localStorage.setItem('loginToken', res.data.token)
              window.localStorage.setItem('role', res.data.role)
              window.localStorage.setItem('name', res.data.name)
              window.localStorage.setItem('id', res.data.id)

              if (res.data.status == 0) {
                message = 'You are banned!'
                type = 'error'
              } else {
                // Admin
                if (res.data.role == 1) {
                  setTimeout(() => {
                    this.$router.push('/admin')
                  }, 800)
                } else {
                  // Guest
                  setTimeout(() => {
                    this.$router.push('/index')
                  }, 800)
                }
              }

            } else {
              type = 'error'
            }

            this.$message({
              showClose: true,
              message: message,
              type: type
            })
          })

        } else {
          this.$message({
            showClose: true,
            message: 'Please enter correct form',
            type: 'error'
          })
        }
      })
    },
    toRegister() {
      this.bForgetPassowrd = !this.bForgetPassowrd
    },

    register() {
      this.$refs['rules'].validate(valid => {
        if (valid) {

          if (this.ruleForm.password != this.ruleForm.repassword) {
            this.$message.error('Password are not the same!')
            return false
          }

          this.$http.post('http://localhost:3000/User/register', this.ruleForm).then(res => {
            console.log(res.data)
            let message = res.data.msg
            let type = ''

            if (res.data.code === 200) {
              type = 'success'
              this.ruleForm = {}
              setTimeout(() => {
                this.toRegister()
              }, 800)


            } else {
              type = 'error'
            }

            this.$message({
              showClose: true,
              message: message,
              type: type
            })

          })

        } else {
          this.$message({
            showClose: true,
            message: 'Please enter correct form',
            type: 'error'
          })
        }
      })
    },

  }

}
</script>

<style>
#login {
  position: relative;
  width: 100%;
  height: 100%;
  background: #F1F2F7;
}

.login-wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 400px;
  background: #fff;
  overflow: hidden;
}

.login-wrap-left {
  position: absolute;
  left: 0;
  width: 60%;
  height: 100%;
}

.login-wrap-left img {
  width: 100%;
  height: 100%;
}

.login-wrap-right {
  position: absolute;
  right: 0;
  padding-top: 15px;
  padding-left: 15px;
  padding-right: 15px;
  width: 40%;
  height: 100%;
  box-sizing: border-box;
  transition: .5s;
  background: #fff;
}

.login-name>div {
  margin: 0 !important;
  padding: 0 !important;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.login-password>div {
  margin: 0 !important;
  padding: 0 !important;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.login-wrap-right h3 {
  text-align: center;
  font-size: 20px;

}

.login-wrap-form {
  margin-top: 15px;
  text-align: center;
}

.login-btn-div {
  width: 100%;
}

.in {
  width: 100%;
}

.login-logo {
  width: 150px;
  height: 100px;
  margin: 0 auto;
  display: block;
}

.forget-password {
  color: rgb(210, 210, 210);
  cursor: pointer;
}

.forget-password:hover {
  color: #3399FF;
}

.login-operation {
  width: 100%;
  margin-top: 30px;
}

.login-operation>div {
  margin: 0 !important;
  padding: 0 !important;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.forget-password-wrap {
  position: absolute;
  right: 0;
  width: 40%;
  height: 100%;
  transform: translateX(100%);
  transition: .5s;
  padding-top: 15px;
  padding-left: 15px;
  padding-right: 15px;
  box-sizing: border-box;
  opacity: 0;
}

.forget-password-wrap h3 {
  text-align: center;
  color: #59A8F4;
  line-height: 80px;
}

.login-trans {
  transform: translateX(-100%);
  opacity: 0;
}

.forget {
  transform: translateX(0%);
  opacity: 1;
}

.forget-btn-div {
  width: 100%;
  display: flex;
  justify-content: center;
}

.show-pwd {
  position: absolute;
  right: 10px;
  bottom: 0px;
  font-size: 16px;
  color: $dark_gray;
  cursor: pointer;
  user-select: none;
}
</style>
