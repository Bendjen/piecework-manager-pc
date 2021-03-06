import Vue from 'vue'
import App from './app/index.vue'
import router from './router'
// import 'flex.css'`
// import ViserVue from 'viser-vue'
import NP from 'number-precision'
import { MessageBox, Notification, Loading,Dialog } from 'element-ui'
import InitData from '@/utils/InitData'

let _loadingInstance: any = null

Vue.prototype.$NP = NP
Vue.prototype.$MessageBox = MessageBox
Vue.prototype.$Notification = Notification
Vue.prototype.$Loading = {
  open: () => {
    _loadingInstance = Loading.service({
      fullscreen: false,
      lock: true,
      text: '请稍候'
    })
  },
  close: () => {
    _loadingInstance.close()
    _loadingInstance = null
  }
}

Vue.config.productionTip = false

Vue.use(Dialog)

InitData()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// 声明全局方法
declare module 'vue/types/vue' {
  interface Vue {
    $NP: any,
    $Notification: any,
    $MessageBox: any,
    $Loading: any,
  }
}
