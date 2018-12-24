import Vue from 'vue'
import './index.scss'
import { Component } from 'vue-property-decorator'
import { Table, TableColumn, Input } from 'element-ui'
import { IRecord, IStaff } from '@/declare.d.ts'
import * as Record from '@/utils/Record'
import * as Fetch from '@/utils/Fetch'
// import data from '@/data'
import { View } from '@antv/data-set'

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Input)

@Component
export default class PieceRecord extends Vue {
  name = 'Record'
  data () {
    return {
      itemList: [],
      staffList: [],
      tableData: [],
      ifCharts: true,
      chartsData: [],
      label: { offset: 12 },
      cmd: '',
      chartHeight: 620
    }
  }
  mounted () {
    this.$data.itemList = Fetch.itemTypeList()
    this.$data.staffList = Fetch.staffList()
    this.freshTable()
  }

  freshTable () {
    const todayRecordList = Fetch.recordFilter({ date: new Date(), unit: 'day', action: 'PIECE_RECORD' })
    let tableData: any = Fetch.staffList()
    let chartsData: any = [...new Set(todayRecordList.map((item: IRecord) => { return { name: item.staff } }))]
    todayRecordList.forEach((item: IRecord) => {
      const tableStaffIndex = tableData.findIndex((data: IStaff) => data.name === item.staff)
      const chartsStaffIndex = chartsData.findIndex((data: IStaff) => data.name === item.staff)
      if (tableStaffIndex !== -1) {
        tableData[tableStaffIndex][item.type] = this.$NP.plus(tableData[tableStaffIndex][item.type] || 0, item.num)
      }
      if (chartsStaffIndex !== -1) {
        chartsData[chartsStaffIndex][item.type] = this.$NP.plus(chartsData[chartsStaffIndex][item.type] || 0, item.num)
      }
    })
    const dv = new View().source(chartsData)
    dv.transform({
      type: 'fold',
      fields: [...new Set(todayRecordList.map((item: IRecord) => item.type))],
      key: '工种',
      value: '数量',
      retains: ['name']
    })
    this.$set(this.$data, 'chartsData', dv.rows)
    this.$set(this.$data, 'tableData', tableData)
  }

  cellClick (row: any, column: any, cell: any) {
    this.$set(this.$data, 'activeCell', {
      row: row.name,
      column: column.label,
      value: row.time
    })
  }
  recordByTable (name: string, type: string, event: any) {
    const vm = this
    Record.editRecord({ type: type, num: event.target.value, staff: name }).then(res => vm.freshTable()).catch(e => e)
  }
  doCommand (event: any) {
    const vm = this
    if (event.keyCode === 13) {
      const cmdArr = this.$data.cmd.split(' ')
      if (cmdArr.length !== 3) {
        this.$MessageBox.alert('命令格式错误', '提示')
      } else {
        const key = cmdArr[0]
        const type = cmdArr[1]
        const num = cmdArr[2]
        const staffIndex = this.$data.staffList.findIndex((item: IStaff) => item.name === name)
        if (staffIndex === -1) {
          this.$MessageBox.alert('您输入的员工不存在，请检查后重试', '提示')
        } else {
          const staff = this.$data.staffList[staffIndex]
          Record.pieceRecord({ type: type, num: num, staff: staff }).then(res => vm.freshTable()).catch(e => e)
        }
      }
      this.$set(this.$data, 'cmd', '')
    }
  }
}
