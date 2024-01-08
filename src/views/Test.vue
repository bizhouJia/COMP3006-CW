<template>
  <div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      notOpened: [],
      open: []
    }
  },
  components: {
  },
  mounted() {
    this.fGetRoom()
  },
  methods: {
    fGetRoom() {
      this.$http.get('http://localhost:3000/getRoom').then(res => {
        this.notOpened = res.data.notOpen;
        this.open = res.data.open;
        console.log(res)
      }).catch(err => {
        this.$message({
          showClose: true,
          message: 'Failed',
          type: 'error'
        })
      })
    },
  },
  computed: {
  },
}
</script>
