<template>
  <div class="merchant-container">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-divider />
      <van-cell v-for="item in list" :key="item.id" class="order-list">
        <img class="fl" :src="require('../../assets/img/' + item.merchantImg)" alt="" />
        <span class="merchat-name">{{ item.merchantName }}</span>
        <span class="content">{{ item.merchantNeed }}</span>
        <span class="price">￥{{ item.price }}</span>
        <div class="button fr" @click="Dialog($event, item.id)">数量{{ item.merchantNum }}点击报名</div>
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
        this.initMerchant()
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        this.finished = true
      }, 1000)
    },
    //（确认、取消）的弹出框
    Dialog(e, id) {
      this.$dialog
        .confirm({
          title: '报名',
          message: '请问您是否要报名',
          confirmButtonColor: 'red',
        })
        .then(() => {
          this.apply(e, id)
        })
        .catch(() => {
          console.log('点击了取消')
        })
    },
    async initMerchant() {
      await this.$http.get('/merchant', {}).then(({ data: res }) => {
        if (res.data === null) {
          alert(res.msg)
        } else {
          this.list = res.data
          console.log(this.list)
        }
      })
    },
    async apply(e, id) {
      await this.$http({
        url: '/order',
        method: 'POST',
        params: {
          merchantId: id,
          userId: '1',
        },
      }).then(({ data: res }) => {
        if (res.data === null) {
          alert(res.msg)
        } else {
          alert(res.msg)
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.merchant-container {
  .order-list {
    position: relative;
    height: 100px;
    .button {
      margin: 20px 0;
      width: 200px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      border-radius: 20px;
      background-color: #1989fa;
    }
    img {
      width: 80px;
      height: 80px;
      border-radius: 5px;
      margin-right: 10px;
    }

    .merchat-name {
      font-size: 17px;
      font-weight: 800;
      line-height: 10px;
    }
    .content {
      position: absolute;
      left: 90px;
      top: 55px;
    }
    .price {
      position: absolute;
      left: 90px;
      top: 30px;
      font-size: 12px;
      color: #fcd337;
    }
  }
}
</style>
