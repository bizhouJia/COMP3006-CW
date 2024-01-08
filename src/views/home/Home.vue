<template>
  <div class="home">
    <Header />
    <el-container>
      <Aside />
      <el-main>
        <div class="main">
          <router-view />
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
  },
  mounted() {
  }
}
</script>


<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
}

.main {
  width: 100%;
  height: 100%;
  background: #fff;
  padding: 15px;
  box-sizing: border-box;
  border-radius: 3px;
  overflow-y: auto;
}
</style>
