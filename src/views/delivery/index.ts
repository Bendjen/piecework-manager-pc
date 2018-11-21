import Vue from 'vue'
import './index.scss'
import { Component } from 'vue-property-decorator'
import { Table, TableColumn, Input, MessageBox, Notification } from 'element-ui'
import { IRecord, IStaff } from '@/declare.d.ts'
import data from '@/data'
import { View } from '@antv/data-set'

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Input)

@Component
export default class Delivery extends Vue {
  name = 'Delivery'
  data () {
    return {
      data: [
        { year: '1951 年', sales: 38 },
        { year: '1952 年', sales: 52 },
        { year: '1956 年', sales: 61 },
        { year: '1957 年', sales: 145 },
        { year: '1958 年', sales: 48 },
        { year: '1959 年', sales: 38 },
        { year: '1960 年', sales: 38 },
        { year: '1962 年', sales: 38 }
      ],
      scale: [{
        dataKey: 'sales',
        tickInterval: 20
      }],
      height: 600
    }
  }
  doCommand (event: any) {
    if (event.keyCode === 13) {
      const cmdArr = this.$data.cmd.split(' ')
      if (cmdArr.length !== 2) {
        MessageBox.alert('命令格式错误', '提示').catch(err => console.log(err))
      } else {
        const workType = cmdArr[0]
        const num = cmdArr[1]

        Notification.success({
          title: workType,
          message: `${workType} 出货 ${num} 万件`
        })

      }
      this.$set(this.$data, 'cmd', '')
    }
  }
}
