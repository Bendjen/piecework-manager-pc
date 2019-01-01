import Vue from 'vue'
import './index.scss'
import { Component } from 'vue-property-decorator'
// import FileSaver from 'file-saver'

import store from 'store'
import dayjs from 'dayjs'

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
          const result: any = this.result
          const data: any = JSON.parse(result)
          try {
            store.set('OPERATION_RECORD_LIST', data['OPERATION_RECORD_LIST'])
            store.set('STAFF_LIST', data['STAFF_LIST'])
            store.set('ITEM_TYPE_LIST', data['ITEM_TYPE_LIST'])
            vm.$Notification.success({
              title: '成功',
              message: '导入数据完毕'
            })
          } catch (err) {
            vm.$MessageBox.alert('文件解析失败：文件格式错误，请选择JSON文件', '错误')
          }
        }
      }
    }
  }

  importData () {
    this.$MessageBox.confirm('导入数据将会覆盖当前数据，确认要这么做吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      let input: any = window.document.getElementById('file')
      input.click()
    })

  }

  exportData () {
    try {
      let PieceManagerLocaStorage = {
        'OPERATION_RECORD_LIST': store.get('OPERATION_RECORD_LIST') || [],
        'STAFF_LIST': store.get('STAFF_LIST') || [],
        'ITEM_TYPE_LIST': store.get('ITEM_TYPE_LIST') || []
      }
      let file = new File([JSON.stringify(PieceManagerLocaStorage)], `${dayjs().format('导出数据YY-MM-DD')}.json`, { type: 'json/plain;charset=utf-8' })
      window.saveAs(file)
    } catch (err) {
      this.$MessageBox.alert('浏览器不支持导出文件，请切换到主流浏览器后再次尝试', '错误')
    }
  }
}
