<template>
  <div class="user-container">
    <div class="user-head">
      <img class="fl" src="@/assets/img/head.jpg" alt="" />
      <span class="fl">用户id：</span>
    </div>
    <van-notice-bar left-icon="volume-o" text="欢迎使用外卖狗熊,祝您用餐愉快" />
    <div class="setting">用户设置</div>
    <div class="logout" @click="logout">退出登录</div>
    <Bottom></Bottom>
  </div>
</template>

<script>
import Bottom from '@/components/Bottom.vue'
export default {
  components: {
    Bottom,
  },
  methods: {
    logout() {
      this.$router.push('/')
    },
  },
}
</script>

<style lang="less">
.user-container {
  .user-head {
    padding: 50px 15px 15px 15px;
    height: 50px;
    background-color: #1989fa;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    span {
      margin-left: 10px;
      margin-top: 30px;
    }
  }
  .setting {
    padding: 5px;
    height: 50px;
    line-height: 50px;
    background-color: #f4f4f4;
    border-bottom: 1px solid #cacdd1;
  }
  .logout {
    padding: 5px;
    height: 50px;
    line-height: 50px;
    background-color: #f4f4f4;
  }
}
</style>
