<template>
  <el-card class="box-card" shadow="always">
    <div slot="header">
      <span>Room information management</span>
    </div>
    <el-table ref="multipleTable" :data="list" tooltip-effect="dark" style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" />
      <el-table-column label="Room number">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>Details: </p>
            <p>{{ scope.row.remark }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag>{{ scope.row.roomNumber }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="Room type">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <div slot="reference" class="name-wrapper">
              <el-tag>{{ scope.row.roomType }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="roomPicture" label="Room picture">
        <template slot-scope="scope">
          <img style="width: 100px; height: 80px" :src="scope.row.roomPicture" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="roomPrice" label="Price">
        <template slot-scope="scope">
          <span type="primary">{{ scope.row.roomPrice + ' pounds/day' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Discount">
        <template slot-scope="scope">
          <el-tag type="primary">{{ scope.row.roomDiscount + '%' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="roomStatus" label="Status">
        <template slot-scope="scope">
          <el-button :type="showStatus(scope.row.roomStatus)" size="mini">{{ scope.row.roomStatus | formatStatus
          }}</el-button>
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
      </el-table-column></el-table>
    <div style="padding: 14px;">
      <el-pagination :current-page="currentPage" :page-size="pageSize" :total="list.length" style="float: right"
        background layout="total, prev, pager, next, jumper" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
      <div class="bottom">
        <el-button type="primary" @click="navigateTo('add')">Add room information</el-button>
        <el-button type="danger" @click="massDeletion">Batch delete</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>

import ElImage from 'element-ui/packages/card/src/main'

export default {
  filters: {
    formatStatus: function (value) {
      switch (value) {
        case 0: return 'Unavailable'
        case 1: return 'Available'
        case 2: return 'Reserved'
        case 3: return 'Checked-in'
      }
    }
  },
  components: {
    ElImage
  },
  data() {
    return {
      visible2: false,
      multipleSelection: [],
      list: [],
      typeList: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 10
    }
  },
  created: function () {
    this.getRoomType()
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
      this.listLoading = true
      this.$http.get('http://localhost:3000/RoomInfo/').then(res => {
        this.list = res.data
        for (let i = 0; i < this.list.length; i++) {
          this.typeList.forEach(item => {
            if (this.list[i].roomType == item._id) {
              this.list[i].roomType = item.room_type_name
            }
          })
        }

        this.listLoading = false
      })
    },
    getRoomType() {
      this.$http.get('http://localhost:3000/RoomType/').then(res => {
        this.typeList = res.data
      })
    },
    navigateTo(val) {
      this.$router.push({ path: '/roomInfo/' + val })
    },
    handleEdit(index, row) {
      this.$router.push({
        path: '/roomInfo',
        name: 'EditRoom',
        params: {
          id: row._id
        }
      })
    },
    handleDel(row) {
      row.visible2 = false
      row.loading = true

      this.$http.delete(`http://localhost:3000/RoomInfo/${row._id}`).then(res => {
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
      })
      row.loading = false
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
      self.multipleSelection.forEach(function (value, index) {
        self.$http.delete(`http://localhost:3000/RoomInfo/${value._id}`)
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
