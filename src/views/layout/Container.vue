<template>
  <el-container id="container">
    <el-header style="background-color: #fff;">
      <div class="header">
        <div class="header-left">

        </div>
        <div class="header-right">
          <div class="svg-icon-div" @click="fFullScreen">
            <svg version="1.1" role="presentation" width="22.857142857142854" height="22.857142857142854"
              viewBox="0 0 1024 1024" class="svg-icon">
              <path
                d="M868.6 96H720c-7.6 0-15.2 2.9-21 8.7-5.8 5.8-8.7 13.4-8.7 21s2.9 15.2 8.7 21c5.8 5.8 13.4 8.7 21 8.7h106.5L580.1 401.8c-11.6 11.6-11.6 30.4 0 42 11.6 11.6 30.4 11.6 42 0l246.4-246.4V304c0 7.6 2.9 15.2 8.7 21 5.8 5.8 13.4 8.7 21 8.7s15.2-2.9 21-8.7c5.8-5.8 8.7-13.4 8.7-21V155.4c0.1-32.8-26.5-59.4-59.3-59.4zM898.3 690.3c-7.6 0-15.2 2.9-21 8.7-5.8 5.8-8.7 13.4-8.7 21v106.5L622.2 580.1c-11.6-11.6-30.4-11.6-42 0s-11.6 30.4 0 42l246.4 246.4H720c-7.6 0-15.2 2.9-21 8.7-5.8 5.8-8.7 13.4-8.7 21s2.9 15.2 8.7 21c5.8 5.8 13.4 8.7 21 8.7h148.6c32.8 0 59.4-26.6 59.4-59.4V720c0-7.6-2.9-15.2-8.7-21-5.8-5.8-13.4-8.7-21-8.7zM401.8 580.1L155.4 826.5V720c0-7.6-2.9-15.2-8.7-21-5.8-5.8-13.4-8.7-21-8.7s-15.2 2.9-21 8.7c-5.8 5.8-8.7 13.4-8.7 21v148.6c0 32.8 26.6 59.4 59.4 59.4H304c7.6 0 15.2-2.9 21-8.7 5.8-5.8 8.7-13.4 8.7-21s-2.9-15.2-8.7-21c-5.8-5.8-13.4-8.7-21-8.7H197.5l246.4-246.4c11.6-11.6 11.6-30.4 0-42-11.6-11.7-30.5-11.7-42.1-0.1zM197.5 155.4H304c7.6 0 15.2-2.9 21-8.7 5.8-5.8 8.7-13.4 8.7-21s-2.9-15.2-8.7-21c-5.8-5.8-13.4-8.7-21-8.7H155.4C122.6 96 96 122.6 96 155.4V304c0 7.6 2.9 15.2 8.7 21 5.8 5.8 13.4 8.7 21 8.7s15.2-2.9 21-8.7c5.8-5.8 8.7-13.4 8.7-21V197.5l246.4 246.4c11.6 11.6 30.4 11.6 42 0 11.6-11.6 11.6-30.4 0-42L197.5 155.4z"
                stroke="transparent" />
            </svg>
          </div>
          <el-dropdown trigger="hover" @command="dropdownComm">
            <span class="el-dropdown-link">
              {{ name }}
              <i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="userInfo">User center</el-dropdown-item>
              <el-dropdown-item command="modifyPw">Change password</el-dropdown-item>
              <el-dropdown-item style="color: red;" divided command="logout">Logout</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div class="admin-logo">
            <img :src="userInfo.avatar ? userInfo.avatar : defaultavatar" alt="Cannot find photo">
          </div>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside>
        <el-menu :collapse="isCollapse" background-color="#324157" text-color="#fff" active-text-color="#ffd04b"
          class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
          <el-menu-item index="0" @click="handleNav">
            <i class="el-icon-menu" />
            <span slot="title">Expand/Collapse</span>
          </el-menu-item>
          <el-menu-item index="1" @click="navigateTo('/admin')">
            <i class="el-icon-menu" />
            <span slot="title">Main page</span>
          </el-menu-item>
          <el-menu-item index="2" @click="navigateTo('/userManage')">
            <i class="el-icon-menu" />
            <span slot="title">User management</span>
          </el-menu-item>
          <el-menu-item index="3" @click="navigateTo('/roomType')">
            <i class="el-icon-menu" />
            <span slot="title">Room type</span>
          </el-menu-item>
          <el-menu-item index="4" @click="navigateTo('/roomInfo')">
            <i class="el-icon-menu" />
            <span slot="title">Room information</span>
          </el-menu-item>
          <el-menu-item index="5" @click="navigateTo('/bookingType')">
            <i class="el-icon-menu" />
            <span slot="title">Reservation method</span>
          </el-menu-item>
          <el-menu-item v-if="role == 'admin'" index="6" @click="navigateTo('/worker')">
            <i class="el-icon-menu" />
            <span slot="title">Admin management</span>
          </el-menu-item>
          <el-menu-item index="7" @click="navigateTo('/order')">
            <i class="el-icon-menu" />
            <span slot="title">Order information</span>
          </el-menu-item>
          <el-menu-item index="8" @click="navigateTo('/user')">
            <i class="el-icon-menu" />
            <span slot="title">User information</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view @getMessage="showMsg" @name='changeName' />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

import ElContainer from 'element-ui/packages/container/src/main'
import ElHeader from 'element-ui/packages/header/src/main'
import ElAside from 'element-ui/packages/aside/src/main'
import ElMain from 'element-ui/packages/main/src/main'

export default {
  name: 'Container',
  components: { ElMain, ElAside, ElHeader, ElContainer },
  data() {
    return {
      userInfo: '',
      defaultavatar: require('@/assets/images/avatar.jpg'),
      isCollapse: false,
      bFullScreen: false,
      role: '',
      name: 'admin'
    }
  },
  created: function () {
    this.name = localStorage.getItem('name')
    this.getInfo()
  },
  methods: {
    changeName() {
      this.name = localStorage.getItem('name')
    },

    getInfo() {
      let id = localStorage.getItem('id')
      // Get personal information
      this.$http.post('http://localhost:3000/User/getOne', {
        id
      }).then(res => {
        if (res.data.code == 200) {
          this.userInfo = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }

      })
    },

    showMsg(val) {
      this.userInfo.avatar = val
    },

    fFullScreen() {
      const element = document.documentElement
      if (this.bFullScreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen()
        }
      }
      this.bFullScreen = !this.bFullScreen
    },
    dropdownComm(command) {
      switch (command) {
        case 'userInfo':
          this.$router.push({ path: '/userInfo' });
          break;
        case 'modifyPw':
          this.$router.push({ path: '/userInfo/modify' });
          break;
        case 'logout':
          this.$http.post('http://localhost:3000/logout', { withCredentials: true }).then(res => {
            if (res.data.code === 200) {
              this.$message({
                showClose: true,
                message: res.data.msg,
                type: 'success'
              })
              window.localStorage.clear()
              this.$router.push({ path: '/login' })
            } else {
              this.$message({
                showClose: true,
                message: res.data.msg,
                type: 'error'
              })
            }
          }).catch(error => {
            this.$message({
              showClose: true,
              message: 'Failed ' + error,
              type: 'err'
            })
          });
          break;
      }
    },
    navigateTo(val) {
      this.$router.push(val)
    },
    handleNav() {
      this.isCollapse = this.isCollapse === false
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
#container {
  height: inherit;
}

.el-header {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.16);
}

.header {
  margin: 10px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left {
  min-width: 140px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left img {
  width: 60px;
  height: 60px;
}

.header-right {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.svg-icon-div {
  height: 100%;
  padding: 0 22px;
}

.header-right img {
  width: 40px;
  height: 40px;
  margin-left: 10px;
  border-radius: 50%;
}

.svg-icon {
  vertical-align: middle;
  color: #fff !important;
  fill: #515151;
  cursor: pointer;
  transition: .3s;
}

.svg-icon:hover {
  fill: #58A6F3;
}

.icon-menu {
  display: block;
  width: 30px;
  height: 30px;
  background: url("../../assets/images/menu.png") no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
}

.icon-menu:hover {
  background: url("../../assets/images/menu-hover.png") no-repeat;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-dropdown-link {
  cursor: pointer;
}

el-menu-vertical-demo {
  border-right: none;
}

.el-aside {
  color: #fff;
  width: inherit !important;
  margin-top: -60px;
  background-color: #324157;
}
</style>
