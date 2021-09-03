import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

//1.安装插件
const router = new VueRouter({
  routes: [{
      path: '',
      component: () => import('views/home/home.vue'),
      redirect: '/home',
    },
    {
      path: '/home',
      component: () => import('views/home/home.vue'),
    },
    {
      path: '/cart',
      component: () => import('views/cart/cart.vue')
    },
    {
      path: '/category',
      component: () => import('views/category/categorg.vue')
    },
    {
      path: '/profile',
      component: () => import('views/profile/profile.vue')
    },
    {
      path: '/detail/:iid',
      component: () => import('views/detail/detail.vue')
    },
  ],
  mode: 'history',
})

export default router
