<template>
  <div class="login-container">
    <Top></Top>
    <div class="login-box">
      <van-form @submit="onSubmit">
        <van-field
          class="name"
          @touchstart.native.stop="show = true"
          @blur="pshow = false"
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          readonly
          clickable
          class="passwd"
          @touchstart.native.stop="pshow = true"
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="onSubmit">提交</van-button>
        </div>
      </van-form>
      <van-number-keyboard :show="show" @blur="show = false" @input="onInput" @delete="onDelete" />
      <van-number-keyboard v-model="password" :show="pshow" :maxlength="10" @blur="pshow = false" />
    </div>
  </div>
</template>

<script>
import Top from '@/components/Top.vue'
import Bottom from '@/components/Bottom.vue'
export default {
  components: {
    Top,
    Bottom,
  },
  data() {
    return {
      username: '',
      password: '',
      show: false,
      pshow: false,
    }
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values)
    },
    onInput(value) {
      this.username = this.username + value
      console.log(this.username)
    },
    onDelete() {
      console.log(this.username.length)
      this.username = this.username.slice(0, this.username.length - 1)
    },
    passwdInput(value) {},
    passwdDelete() {},
  },
}
</script>

<style lang="less" scoped>
.login-container {
  .login-box {
    margin-top: 60px;
    .name {
      border: 1px solid #1989fa;
      border-radius: 20px;
    }
    .passwd {
      margin-top: 10px;
      border: 1px solid #1989fa;
      border-radius: 20px;
    }
  }
}
</style>
