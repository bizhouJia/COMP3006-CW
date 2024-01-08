<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>Personal information</span>
			<el-button @click="edit" style="float: right; padding: 3px 0" type="text">Edit</el-button>
		</div>
		<div class="info">
			<div class="avatar">
				<div class="img">
					<span><img :src="userInfo.avatar ? userInfo.avatar : defaultavatar" alt="Cannot find photos"></span>
					<span>
						<el-upload class="upload-demo" action="http://localhost:3000/user/upload"
							:on-success="successUpload" :show-file-list="false">
							<el-button size="small" type="primary">Upload</el-button>
						</el-upload>

					</span>
				</div>
			</div>
			<div class="text">
				<div class="item">
					<span class="title">Name</span>
					<span class="content">{{ userInfo.name }}</span>
				</div>
				<div class="item">
					<span class="title">Account</span>
					<span class="content">{{ userInfo.account }}</span>
				</div>
				<div class="item">
					<span class="title">Password</span>
					<span class="content">************</span>
				</div>
				<div class="item">
					<span class="title">Gender</span>
					<span class="content">{{ userInfo.sex == 0 ? 'Female' : 'Male' }}</span>
				</div>
				<div class="item">
					<span class="title">Role</span>
					<span class="content">{{ userInfo.role == 0 ? 'Guest' : 'Admin' }}</span>
				</div>
				<div class="item">
					<span class="title">Status</span>
					<span class="content">{{ userInfo.status == 1 ? 'Enable' : 'Disable' }}</span>
				</div>
				<div class="item">
					<span class="title">Phone Number</span>
					<span class="content">{{ userInfo.phone }}</span>
				</div>
				<div class="item">
					<span class="title">Email</span>
					<span class="content">{{ userInfo.email }}</span>
				</div>
			</div>
		</div>
	</el-card>
</template>

<script>

export default {
	data() {
		return {
			userInfo: '',
			defaultavatar: require('@/assets/images/avatar.jpg'),
		}
	},
	mounted() {
		this.defaultavatar = '../' + this.defaultavatar
		let id = localStorage.getItem('id')
		// Get personal information
		this.$http.post('http://localhost:3000/User/getOne', { id }).then(res => {
			console.log(res.data)
			if (res.data.code == 200) {
				this.userInfo = res.data.data
				if (this.userInfo.avatar) {
					this.userInfo.avatar = '../' + this.userInfo.avatar
				}
			} else {
				this.$message.error(res.data.msg)
			}

		})
	},
	methods: {

		successUpload(val) {
			this.userInfo.avatar = '../' + val.url
			this.$emit('getMessage', val.url)

			let id = localStorage.getItem('id')
			let avatar = val.url
			// Update user photo
			this.$http.post('http://localhost:3000/User/' + id, {
				avatar
			}).then(res => {
				if (res.data.code == 200) {
					this.$message.success(res.data.msg)
				} else {
					this.$message.error(res.data.msg)
				}

			})
		},

		// Edit personal information
		edit() {
			this.$router.push('/index/edit')
		}
	},

}
</script>

<style lang="scss" scoped>
.info {
	display: flex;
	justify-content: center;
	align-items: center;
}

.avatar {
	flex: 1;
	height: 100px;
}

.img {
	width: 100px;
	height: 100px;
	margin: 0 auto;
}

.img span {
	display: block;
	text-align: center;
}

.img span img {
	width: 100%;
	height: 100px;
}

.text {
	flex: 1;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	padding: 20px 0;
}

.item {
	width: 100%;
	height: 40px;
	line-height: 40px;
	font-size: 16px;
	font-weight: 500;
}

.title {
	display: inline-block;
	width: 90px;
}

.content {
	display: inline-block;
	text-align: left;
	width: 100px;
}

.clearfix:before,
.clearfix:after {
	display: table;
	content: "";
}

.clearfix:after {
	clear: both
}

.box-card {
	width: 100%;
}
</style>
