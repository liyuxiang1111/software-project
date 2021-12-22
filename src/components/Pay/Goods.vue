<template>
  <div class="goods-container">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-divider />
      <van-cell v-for="item in list" :key="item.id" class="order-list">
        <div>商家id： {{ item.merchantId }} 订单编号：{{ item.id }}</div>
        <div>{{ item.isReturn == 0 ? '已经取消' : '报名中' }}</div>
        <div class="button-box">
          <div class="fr button" @click="Dialog($event, item.id, item.isReturn)">取消报名</div>
          <div class="fr button" @click="dialogVisible = true">提交订单</div>
          <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">
            <span>
              <el-upload
                class="avatar-uploader"
                action="http://127.0.0.1:8888/information"
                :on-success="handleAvatarFileSuccess"
                :on-error="handleAvatarFileError"
                :before-upload="beforeAvatarFileUpload"
                :data="{ orderId: item.id, orderNum: num }"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </span>
            <input type="text" name="" id="" placeholder="请输入商家编号" v-model="num" />
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>
        </div>
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
      dialogVisible: false,
      imageUrl: '',
      tempUrl: '',
      num: '',
    }
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        this.initGoods()

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        this.finished = true
      }, 1000)
    },
    //（确认、取消）的弹出框
    Dialog(e, id, flag) {
      this.$dialog
        .confirm({
          title: '取消订单',
          message: '请问您是否要取消订单',
          confirmButtonColor: 'red',
        })
        .then(() => {
          if (!flag) {
            alert('您已经取消')
          } else {
            this.cancel(e, id)
          }
        })
        .catch(() => {
          console.log('点击了取消')
        })
    },
    async initGoods() {
      await this.$http({
        method: 'post',
        url: 'order/list',
        params: {
          userId: '1',
        },
      }).then(({ data: res }) => {
        if (res.data === null) {
          alert(res.msg)
        } else {
          this.list = res.data
          console.log(this.list)
        }
      })
    },
    async cancel(e, id) {
      await this.$http({
        url: '/order/return',
        method: 'post',
        params: {
          orderId: id,
        },
      }).then(({ data: res }) => {
        if (res.data === null) {
          alert(res.msg)
          this.$router.go(0)
        } else {
          alert(res.msg)
        }
      })
    },
    //上传图片
    //上传文件
    handleAvatarFileError: function (err, file) {
      alert('文件上传走丢了。。')
    },
    handleAvatarFileSuccess: function (res, file) {
      this.$message.success('上传文件成功！')
    },
    beforeAvatarFileUpload: function (file) {
      //限制的上限为10M
      const isLt10M = file.size / 1024 / 1024 < 10

      if (!isLt10M) {
        this.$message.error('上传文件大小不能超过 10MB!')
      }
      return isLt10M
    },
  },
}
</script>

<style lang="less" scoped>
.goods-container {
  .order-list {
    height: 100px;
    .button-box {
      margin-right: 5px;
      .button {
        width: 80px;
        text-align: center;
        background-color: #1989fa;
        margin-right: 5px;
        border-radius: 20px;
        font-size: 8px;
        color: #ffffff;
      }
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409eff;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    }
  }
}
</style>
