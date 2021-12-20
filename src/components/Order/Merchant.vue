<template>
  <div class="merchant-container">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-divider />
      <van-cell v-for="item in list" :key="item" class="order-list">
        <span>{{ item }}</span>
        <div class="button fr" @click="Dialog">报名</div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { Dialog, Button } from 'vant'
export default {
  components: {
    [Dialog.Component.name]: Dialog.Component,
    [Button.name]: Button,
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      show: false,
      msg: '',
    }
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
    //（确认、取消）的弹出框
    Dialog() {
      this.$dialog
        .confirm({
          title: '报名',
          message: '请问您是否要报名',
          confirmButtonColor: 'red',
        })
        .then(() => {
          console.log('点击了确认')
        })
        .catch(() => {
          console.log('点击了取消')
        })
    },
  },
}
</script>

<style lang="less" scoped>
.merchant-container {
  .order-list {
    height: 80px;
    .button {
      margin: 10px 0;
      width: 80px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      border-radius: 20px;
      background-color: #1989fa;
    }
  }
}
</style>
