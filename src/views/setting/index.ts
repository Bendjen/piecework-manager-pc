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
  mounted () {
    let vm = this
    // 读取文件监听
    let input: any = document.getElementById('file')
    input.onchange = function () {
      let file: any = this.files[0]
      if (file) {
        let reader = new FileReader()
        reader.readAsText(file)
        vm.$Loading.open()
        reader.onload = function () {
          vm.$Loading.close()
          try {
            console.log(this.result)
          } catch (err) {
            vm.$MessageBox.alert('文件解析失败：文件格式错误，请选择JSON文件', '错误')
          }
        }
      }
    }
  }

  importData () {
    let input: any = window.document.getElementById('file')
    input.click()
  }

  exportData () {
    try {
      this.$MessageBox.alert('浏览器不支持导出文件，请切换到主流浏览器后再次尝试','错误')

        // FileSave();
    } catch (err) {
      this.$MessageBox.alert('浏览器不支持导出文件，请切换到主流浏览器后再次尝试','错误')
    }
  }
}
