import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component({
  props: { msg: String }
})
export default class HelloWorld extends Vue {
  name = 'HelloWorld'

  mounted () {
    this.$Message({
      message: '恭喜你，这是一条成功消息',
      type: 'success'
    })
  }
}
