<template>
  <div class="login-container">
    <img src="@/assets/img/bear.jpg" alt="" />
    <div class="panel">
      <input v-model="name" class="name-ipt" type="text" name="" id="" placeholder="输入用户名" />
      <input v-model="passwd" class="passwd-ipt" type="passwd" name="" id="" placeholder="输入密码" />
    </div>
    <div class="login" @click="login">→</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      passwd: '',
    }
  },
  methods: {
    async login() {
      if (this.name === '' && this.passwd === '') {
        alert('请输入有效的账号和密码')
      } else {
        await this.$http({
          url: '/login',
          methods: 'post',
          params: {
            userName: this.name,
            userPwd: this.passwd,
          },
        }).then(({ data: res }) => {
          if (res.data === null) {
            alert(res.msg)
          } else {
            this.$router.push('/order')
          }
        })
      }
    },
  },
}
</script>

<style lang="less" scoped>
.login-container {
  padding-top: 100px;
  img {
    width: 100px;
    height: 100px;
  }
  .panel {
    margin-top: 20px;
    .name-ipt {
      padding: 5px;
      width: 300px;
      height: 35px;
      background-color: #f4f4f4;
      border-radius: 20px;
      text-align: center;
    }
    .passwd-ipt {
      padding: 5px;
      margin-top: 10px;
      width: 300px;
      height: 35px;
      background-color: #f4f4f4;
      border-radius: 20px;
      text-align: center;
    }
  }
  .login {
    width: 60px;
    height: 60px;
    margin: auto;
    margin-top: 60px;
    border-radius: 50%;
    background-color: #1989fa;
    font-size: 30px;
    line-height: 60px;
  }
}
</style>
