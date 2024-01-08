<template>
  <el-card class="app-container" shadow="always">
    <div slot="header">
      <span>Edit user information</span>
    </div>
    <el-form ref="guest" :model="guest" :rules="rules2" label-width="120px">
      <el-form-item label="Name" prop="name">
        <el-input v-model.number="guest.name" placeholder="Please enter user name" />
      </el-form-item>
      <el-form-item label="Phone Number" prop="phone">
        <el-input v-model="guest.phone" placeholder="Please enter user phone number" />
      </el-form-item>
      <el-form-item prop="sex" label="Gender">
        <el-radio v-model="guest.sex" :label="1">Male</el-radio>
        <el-radio v-model="guest.sex" :label="0">Female</el-radio>
      </el-form-item>
      <el-form-item label="IDcard" prop="idcard">
        <el-input v-model="guest.idcard" />
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onSubmit()">Submit</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import ElCard from 'element-ui/packages/card/src/main'

export default {
  components: { ElCard },
  data() {
    return {
      guest: {
        name: null,
        phone: null,
        sex: null,
        idcard: null
      },
      loading: false,
      rules2: {
        name: [
          { required: true, message: 'Cannot be empty' }
        ],
        phone: [
          { required: true, message: 'Cannot be empty' }
        ],
        sex: [
          { required: true, message: 'Cannot be empty' }
        ],
        idcard: [
          { required: true, message: 'Cannot be empty' }
        ]
      }
    }
  },
  created: function () {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.$http.get(`http://localhost:3000/Guest/${this.$route.params.id}`).then(res => {
        console.log(res.data)
        this.guest = res.data
      })
    },
    onSubmit() {
      this.$refs.guest.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$http.put(`http://localhost:3000/Guest/${this.$route.params.id}`, this.guest).then(response => {
            if (response.data) {
              this.$message({
                message: 'Submit succeed!',
                type: 'success'
              })
              this.loading = false
              setTimeout(this.onCancel(), 20000)
            } else {
              this.showError()
              this.loading = false
            }
          }).catch(error => {
            this.loading = false
            this.showError()
            console.log(error)
          })
        } else {
          this.loading = false
          return false
        }
      })
    },
    showError() {
      this.$message({
        message: 'Submit failed!',
        type: 'error'
      })
    },
    onCancel() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>
