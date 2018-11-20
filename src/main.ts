import Vue from 'vue'
import App from './app/index.vue'
import router from './router'
import 'flex.css'
import ViserVue from 'viser-vue'
import NP from 'number-precision'

Vue.use(ViserVue)
Vue.prototype.$NP = NP
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// 声明全局方法
declare module 'vue/types/vue' {
  interface Vue {
    $NP: any
  }
}
