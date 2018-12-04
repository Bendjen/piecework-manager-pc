import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/index.vue'
import Employee from './views/employee/index.vue'
import Record from './views/record/index.vue'
import Comparison from './views/comparison/index.vue'
import Delivery from './views/delivery/index.vue'
import Setting from './views/setting/index.vue'
import Search from './views/search/index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'employee',
      component: Employee,
      meta: { title: '员工管理' }
    },
    {
      path: '/staff',
      name: 'staff',
      component: Employee,
      meta: { title: '员工管理' }
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: About
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/record',
      name: 'record',
      component: Record,
      meta: { title: '计单' }
    },
    {
      path: '/delivery',
      name: 'delivery',
      component: Delivery,
      meta: { title: '出货报表' }
    },
    {
      path: '/setting',
      name: 'setting',
      component: Setting,
      meta: { title: '设置' }
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
      meta: { title: '筛选统计' }
    },
    {
      path: '/comparison',
      name: 'comparison',
      component: Comparison,
      meta: { title: '报表核对' }
    }
  ]
})
