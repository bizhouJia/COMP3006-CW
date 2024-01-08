<template>
  <el-aside>
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">Expand</el-radio-button>
      <el-radio-button :label="true">Collapse</el-radio-button>
    </el-radio-group>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
      :collapse="isCollapse">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">Navigation 1</span>
        </template>
        <el-menu-item-group>
          <span slot="title">Group 1</span>
          <el-menu-item index="1-1">Menu 1</el-menu-item>
          <el-menu-item index="1-2">Menu 2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Menu2">
          <el-menu-item index="1-3">Menu 3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">Menu 4</span>
          <el-menu-item index="1-4-1">Menu 1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">Navigation 2</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">Navigation 3</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">Navigation 4</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: "navAside",
  data() {
    return {
      isCollapse: true
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-aside {
  color: #333;
}
</style>
