<template>
  <div id="home">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Quick actions</span>
        <span style="float: right; padding: 3px 0">Action</span>
      </div>
      <el-button type="primary" @click="navigateToAddInfo">Check-in</el-button>
      <el-button type="primary" @click="navigateToEditRoom">Check-out</el-button>
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'Home',
  created: function () {
  },
  methods: {
    navigateToAddInfo() {
      this.$router.push('/user/add')
    },
    navigateToEditRoom() {
      this.$router.push('/roomInfo')
    }
  }
}
</script>

