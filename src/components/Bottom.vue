<template>
  <div class="bottom-container">
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="shop-o" to="/order">商家</van-tabbar-item>
      <van-tabbar-item icon="home-o" to="/pay">订单</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/user">用户</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    }
  },
}
</script>

<style></style>
