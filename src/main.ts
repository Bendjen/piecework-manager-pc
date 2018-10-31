import Vue from 'vue'
import App from './/app/index.vue'
import router from './router'
import 'flex.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// 声明全局方法
declare module 'vue/types/vue' {
  interface Vue {
    $Message: any,
    $Modal: any,
    $Confirm: any
  }
}
