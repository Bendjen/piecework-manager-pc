import Vue from 'vue'
import './index.scss'
import { Component } from 'vue-property-decorator'
import { Input } from 'element-ui'

@Component
export default class Setting extends Vue {
  name = 'Setting'
  data () {
    return {
      data: []
    }
  }
}
