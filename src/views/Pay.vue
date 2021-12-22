<template>
  <div class="order-container">
    <Top></Top>
    <div class="order-box">
      <router-view></router-view>
    </div>
    <Bottom></Bottom>
  </div>
</template>

<script>
import Top from '@/components/Top.vue'
import Bottom from '@/components/Bottom.vue'
import Toolbar from '@/components/Order/Toolbar.vue'
export default {
  created() {},
  components: {
    Bottom,
    Top,
    Toolbar,
  },
  methods: {
    async initOrderList() {
      const { data: res } = await request.get()
    },
  },
}
</script>

<style lang="less" scoped></style>
