import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/staff/index.vue'),
      meta: { title: '员工管理' }
    },
    {
      path: '/staff',
      name: 'staff',
      component: () => import('./views/staff/index.vue'),
      meta: { title: '员工管理' }
    },
    {
      path: '/record',
      name: 'record',
      component: () => import('./views/record/index.vue'),
      meta: { title: '计单' }
    },
    {
      path: '/delivery',
      name: 'delivery',
      component:  () => import('./views/delivery/index.vue'),
      meta: { title: '出货报表' }
    },
    {
      path: '/setting',
      name: 'setting',
      component:  () => import('./views/setting/index.vue'),
      meta: { title: '设置' }
    },
    {
      path: '/search',
      name: 'search',
      component:  () => import('./views/search/index.vue'),
      meta: { title: '筛选统计' }
    },
    {
      path: '/comparison',
      name: 'comparison',
      component:  () => import('./views/comparison/index.vue'),
      meta: { title: '报表核对' }
    }
  ]
})
