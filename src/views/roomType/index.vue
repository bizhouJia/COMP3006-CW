<template>
  <el-card class="box-card" shadow="always">
    <div slot="header">
      <span>Room type management</span>
    </div>
    <el-table ref="multipleTable" :loading="listLoading" :data="list" tooltip-effect="dark" style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column label="Room type">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>Details: </p>
            <p>{{ scope.row.remark }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag>{{ scope.row.room_type_name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="Reservation cost">
        <template slot-scope="scope">
          <span type="primary">{{ scope.row.price + ' pounds/day' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="discount" label="Reservation discount">
        <template slot-scope="scope">
          <el-tag type="primary">{{ scope.row.discount + '%' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="area" label="Room area">
        <template slot-scope="scope">
          <span>{{ scope.row.area }} m²</span>
        </template>
      </el-table-column>
      <el-table-column prop="window" label="With window or not">
        <template slot-scope="scope">
          <span>{{ scope.row.window | hasWindow }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Bed number">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top-end">
            <p>Bed size: {{ scope.row.bed_size }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag>{{ scope.row.bed_num }}</el-tag>
            </div>
          </el-popover>
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
      <el-pagination :current-page="currentPage" :page-size="pageSize" :total="tempList.length" style="float: right"
        background layout="total, prev, pager, next, jumper" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
      <div class="bottom">
        <el-button type="primary" @click="navigateTo('add')">Add room type</el-button>
        <el-button type="danger" @click="massDeletion">Batch delete</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>

export default {
  filters: {
    hasWindow: function (value) {
      if (value > 0) return 'Yes'
      else return 'No'
    }
  },
  data() {
    return {
      visible2: false,
      multipleSelection: [],
      listLoading: true,
      list: [],
      tempList: [],
      loading: false,
      currentPage: 1,
      pageSize: 5
    }
  },
  created: function () {
    this.fetchData()
  },
  methods: {
    handleSizeChange(val) {
      console.log(11, val)
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
      let a = []
      let b = []
      let length = this.tempList.length
      if (val == 1) {
        this.tempList.forEach((item, index) => {
          if (index < 5) {
            b.push(item)
          }
        })
        console.log(b)
        this.list = b
      } else {
        this.tempList.forEach((item, index) => {
          if (index >= (val - 1) * 5 && index < (val - 1) * 5 + length % ((val - 1) * 5)) {
            a.push(item)
          }
        })
        this.list = a
      }
    },
    fetchData() {
      this.listLoading = true
      this.$http.get('http://localhost:3000/RoomType/').then(response => {
        this.tempList = response.data
        this.listLoading = false

        let a = []
        this.tempList.forEach((item, index) => {
          if (index < 5) {
            a.push(item)
          }
        })
        this.list = a

        console.log(this.list)
      })
    },
    navigateTo(val) {
      this.$router.push({ path: '/roomType/' + val })
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
    handleEdit(index, row) {
      this.$router.push({
        path: '/roomType',
        name: 'EditType',
        params: {
          id: row._id
        }
      })
    },
    handleDel(row) {
      row.visible2 = false
      row.loading = true

      this.$http.delete(`http://localhost:3000/RoomType/${row._id}`).then(response => {
        if (response.data) {
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
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    massDeletion() {
      let self = this
      if (this.multipleSelection.length == 0) {
        this.$message.error('Please select at least one data!')
        return false
      }
      self.multipleSelection.forEach(function (value, index) {
        self.$http.delete(`http://localhost:3000/RoomType/${value._id}`)
      })
      setTimeout(function () {
        self.fetchData()
        self.$message({
          message: 'Delete succeed!',
          type: 'success'
        })
      }, 0)
    }
  }
}
</script>

<style>
.red {
  color: red;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}
</style>
