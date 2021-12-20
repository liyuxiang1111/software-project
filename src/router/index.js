import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 引入
import Login from '@/views/Login.vue'
import Order from '@/views/Order.vue'
import User from '@/views/User.vue'
import Merchant from '@/components/Order/Merchant.vue'
import Back from '@/components/Order/Back.vue'
import History from '@/components/Order/History.vue'
const routes = [
  { path: '/', component: Login },
  { path: '/login', component: Login },
  { path: '/user', component: User },
  {
    path: '/order',
    component: Order,
    children: [
      { path: '', component: Merchant },
      { path: 'back', component: Back },
      { path: 'history', component: History },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch((err) => err)
}

export default router
