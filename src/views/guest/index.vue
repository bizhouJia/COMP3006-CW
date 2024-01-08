<template>
  <el-card class="box-card" shadow="always">
    <div slot="header">
      <span>User information management</span>
      <!--<el-button type="primary" style="float: right; padding: 6px 12px" icon="el-icon-search">搜索</el-button>-->
    </div>
    <el-table ref="multipleTable" :data="list" tooltip-effect="dark" style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="sex" label="Gender">
        <template slot-scope="scope">
          <span type="primary">{{ scope.row.sex == 1 ? 'male' : 'female' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="Phone Number">
      </el-table-column>
      <el-table-column prop="idcard" label="IDcard">
      </el-table-column>
      <el-table-column label="Edit">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
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
      </el-table-column>
    </el-table>

    <div style="padding: 14px;">
      <el-pagination :current-page="currentPage" :page-size="pagesize" :total="list.length" style="float: right"
        background layout="total, prev, pager, next, jumper" @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>
      <div class="bottom">
        <el-button type="primary" @click="navigateTo('add')">Add user</el-button>
        <el-button type="danger" @click="massDeletion">Batch delete</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>

export default {
  name: 'Guest',
  data() {
    return {
      currentPage: 1,
      pagesize: 10,
      list: [],
      visible2: false,
      loading: null,
      listLoading: false,
      multipleSelection: null
    }
  },
  created: function () {
    this.fetchData()
  },
  methods: {
    handleSizeChange(val) {
      this.pagesize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    fetchData() {
      this.$http.get('http://localhost:3000/Guest').then(res => {
        console.log(res.data)
        this.list = res.data.data
      })
    },
    navigateTo(val) {
      this.$router.push('/user/' + val)
    },
    // Delete
    handleDel(row) {
      row.visible2 = false
      row.loading = true
      this.$http.delete(`http://localhost:3000/Guest/${row._id}`).then(res => {
        if (res.data) {
          this.fetchData()
          this.$message({
            message: 'Delete succeed!',
            type: 'success'
          })
        } else {
          this.$message({
            message: 'Delete failed!',
            type: 'error'
          })
        }
        row.loading = false
        this.fetchData()
      })
    },
    // Edit
    handleEdit(index, row) {
      this.$router.push({
        path: '/user',
        name: 'EditGuest',
        params: {
          id: row._id
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
    massDeletion() {
      let self = this
      self.multipleSelection.forEach(function (value, index) {
        self.$http.delete(`http://localhost:3000/Guest/${value._id}`)
      })
      setTimeout(function () {
        self.fetchData()
        self.$message({
          message: 'Delete succeed!',
          type: 'success'
        })
      }, 10)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style scoped></style>
