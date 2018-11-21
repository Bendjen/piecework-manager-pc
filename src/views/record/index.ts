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
export default class Record extends Vue {
  name = 'Record'
  data () {
    return {
      itemList: data['ITEM_TYPE_LIST'],
      staffList: data['STAFF_LIST'],
      recordList: data['OPERATION_RECORD_LIST'],
      tableData: data['STAFF_LIST'],
      ifCharts: true,
      chartsData: [],
      label: { offset: 12 },
      cmd: '',
      chartHeight: 620
    }
  }
  mounted () {
    this.$data.recordList.forEach((item: IRecord) => {
      const staffIndex = this.$data.tableData.findIndex((data: IStaff) => data.name === item.staff)
      this.$set(this.$data.tableData[staffIndex], item.type,this.$NP.plus(this.$data.tableData[staffIndex][item.type] || 0,item.num))
    })
    // console.log(this.$data.tableData)
    // console.log([...new Set(this.$data.recordList.map((item: IRecord) => item.type))])
    const dv = new View().source(this.$data.tableData)
    dv.transform({
      type: 'fold',
      fields: [...new Set(this.$data.recordList.map((item: IRecord) => item.type))],
      key: '工种',
      value: '数量',
      retains: ['name']
    })
    this.$set(this.$data, 'chartsData', dv.rows)

  }
  cellClick (row: any, column: any, cell: any) {
    this.$set(this.$data, 'activeCell', {
      row: row.name,
      column: column.label,
      value: row.time
    })
  }
  doCommand (event: any) {
    if (event.keyCode === 13) {
      const cmdArr = this.$data.cmd.split(' ')
      if (cmdArr.length !== 3) {
        MessageBox.alert('命令格式错误', '提示').catch(err => console.log(err))
      } else {
        const personId = cmdArr[0]
        const workType = cmdArr[1]
        const num = cmdArr[2]
        const personName = this.$data.staffList.find((item: IStaff) => item.key === personId)
        if (!personName) {
          MessageBox.alert('您输入的员工不存在，请检查后重试', '提示').catch(err => console.log(err))
        } else {
          Notification.success({
            title: personName,
            message: `${workType} 计单 ${num} 万件`
          })
        }
      }
      this.$set(this.$data, 'cmd', '')
    }
  }
}
