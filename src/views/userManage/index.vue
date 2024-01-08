<template>
  <el-card class="box-card" shadow="always">
    <div slot="header">
      <span>User information management</span>
    </div>
    <el-table ref="multipleTable" :data="userList" tooltip-effect="dark" style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" />
      <el-table-column prop="name" label="Name">
      </el-table-column>
      <el-table-column prop="account" label="Accounts">
      </el-table-column>
      <el-table-column prop="sex" label="Gender">
        <template slot-scope="scope">
          <span type="primary">{{ scope.row.sex == 1 ? 'Male' : 'Female' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="Phone number">
      </el-table-column>
      <el-table-column prop="email" label="Email">
      </el-table-column>
      <el-table-column prop="role" label="Role">
        <template slot-scope="scope">
          <span type="primary">{{ scope.row.role == 1 ? 'Admin' : 'Guest' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="Status">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 1" type="primary">{{ scope.row.status == 1 ? 'Enable' : 'Disable' }}</el-tag>
          <el-tag v-else type="danger">{{ scope.row.status == 1 ? 'Enable' : 'Disable' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Edit">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">Edit</el-button>
          <el-popover v-model="scope.row.visible2" placement="top" width="160">
            <p>Delete or not?</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" round @click="scope.row.visible2 = false">Cancel</el-button>
              <el-button type="danger" size="mini" round @click="handleDel(scope.row)">Yes</el-button>
            </div>
            <el-button slot="reference" :loading="scope.row.loading" size="mini" type="danger"
              @click="scope.row.visible2 = true">Delete</el-button>
          </el-popover>
        </template>
      </el-table-column></el-table>
    <div style="padding: 14px;">
      <el-pagination :current-page="currentPage" :page-size="pageSize" :total="userList.length" style="float: right"
        background layout="total, prev, pager, next, jumper" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
      <div class="bottom">
        <el-button type="danger" @click="massDeletion">Batch delete</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>

export default {
  data() {
    return {
      userList: [],
      visible2: false,
      multipleSelection: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 10
    }
  },
  created: function () {
    this.fetchData()
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    // Get user information list
    fetchData() {
      this.listLoading = true
      this.$http.get('http://localhost:3000/user/userList').then(res => {
        this.userList = res.data.data
        this.listLoading = false
      })
    },
    navigateTo(val) {
      this.$router.push({ path: '/roomInfo/' + val })
    },
    // Edit user information
    handleEdit(row) {
      if (row._id == localStorage.getItem('id')) {
        this.$message.error('You have no rights to edit admin information!')
        return false
      }
      this.$router.push({
        path: '/userManage/edit',
        name: 'editUserOne',
        params: {
          id: row._id
        }
      })
    },
    // Delete user
    handleDel(row) {
      if (row._id == localStorage.getItem('id')) {
        this.$message.error('You have no rights to delete admin account!')
        return false
      }
      this.$http.delete(`http://localhost:3000/user/${row._id}`).then(res => {
        if (res.data.code == 200) {
          this.fetchData()
          this.$message.success('Delete succeed!')
        } else {
          this.$message.error('Delete failed!')
        }
      })
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // Batch delete
    massDeletion() {
      const self = this

      self.multipleSelection.forEach(function (value, index) {
        if (value._id == localStorage.getItem('id')) {
          self.$message.error('You have no rights to delete admin account!')
          return false
        }
        self.$http.delete(`http://localhost:3000/user/${value._id}`)
      })
      setTimeout(function () {
        self.fetchData()
        self.$message({
          message: 'Delete succeed!',
          type: 'success'
        })
      }, 0)
    },
    showStatus(val) {
      switch (val) {
        case 0: return 'info'
        case 1: return 'success'
        case 2: return 'warning'
        case 3: return 'danger'
      }
    }
  }
}
</script>

<style>
.bottom {
  margin-top: 13px;
  line-height: 12px;
}
</style>
