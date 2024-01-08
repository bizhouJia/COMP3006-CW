<template>
  <el-card class="box-card" shadow="always">
    <div slot="header">
      <span>Order information management</span>
    </div>
    <el-table ref="multipleTable" :loading="listLoading"
      :data="list.slice((currentPage - 1) * pageSize, currentPage * pageSize)" tooltip-effect="dark" style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="name" label="Booker" />
      <el-table-column prop="phone" label="Phone number" />
      <el-table-column prop="orderType" label="Reservation method" />
      <el-table-column prop="roomNumber" label="Room number" />
      <el-table-column prop="roomType" label="Room type">
        <template slot-scope="scope">
          <span type="primary">{{ scope.row.roomType }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="orderDate" label="Reservation date">
        <template slot-scope="scope">
          <span>{{ scope.row.orderDateRange[0] | formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="orderDays" label="Reservation days" />
      <el-table-column sortable label="Reservation costs">
        <template slot-scope="scope">
          £ {{ scope.row.orderCost }}
        </template>
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
      <el-pagination :current-page="currentPage" :page-size="pageSize" :total="list.length" style="float: right"
        background layout="total, prev, pager, next, jumper" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
      <div class="bottom">
        <el-button type="primary" @click="navigateTo('add')">Add order</el-button>
        <el-button type="danger" @click="massDeletion">Batch delete</el-button>

      </div>

    </div>

  </el-card>
</template>

<script>

export default {
  name: 'Order',
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      list: [],
      roomTypeList: [],
      visible2: false,
      loading: null,
      listLoading: false,
      multipleSelection: []
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
    fetchData() {
      this.$http.get('http://localhost:3000/Order/').then(res => {
        this.list = res.data
      }).catch(err => {
        this.$notify.error({
          title: 'Error',
          message: err.toString()
        })
      })
      this.$http.get('http://localhost:3000/roomType/').then(res => {
        this.roomTypeList = res.data
        for (let i = 0; i < this.list.length; i++) {
          this.roomTypeList.forEach(item => {
            if (this.list[i].roomType == item._id) {
              this.list[i].roomType = item.room_type_name
            }
          })
        }
      })

    },
    navigateTo(val) {
      this.$router.push('/order/' + val)
    },
    handleDel(row) {
      row.visible2 = false
      row.loading = true
      this.$http.delete(`http://localhost:3000/Order/${row._id}`).then(response => {
        if (response.data) {
          this.$message({
            message: 'Delete succeed!',
            type: 'success'
          })
          this.list = null
          row.loading = false
          this.fetchData()
        } else {
          this.$message({
            message: 'Delete failed!',
            type: 'error'
          })
        }
      }).catch(error => {
        row.loading = false
        console.log(error)
      })
      row.loading = false
      this.fetchData()
    },
    handleEdit(index, row) {
      this.$router.push({
        path: '/Order',
        name: 'EditOrder',
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
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    massDeletion() {
      const self = this
      if (this.multipleSelection.length == 0) {
        this.$message.error('Please select at least one order!')
        return false
      }
      self.multipleSelection.forEach(function (value, index) {
        self.$http.delete(`http://localhost:3000/Order/${value._id}`)
      })
      setTimeout(function () {
        self.fetchData()
        self.$message({
          message: 'Delete succeed!',
          type: 'success'
        })
      }, 10)
    }
  }
}
</script>

<style scoped></style>
