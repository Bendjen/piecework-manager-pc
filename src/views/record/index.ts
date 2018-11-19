import Vue from 'vue'
import './index.scss'
import { Component } from 'vue-property-decorator'
import { Table, TableColumn, Input } from 'element-ui'
import { IRecord, IStaff } from '@/declare.d.ts'
import data from '@/data'
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
      ifCharts: false
    }
  }
  mounted () {
    this.$data.recordList.forEach((item: IRecord) => {
      const staffIndex = this.$data.tableData.findIndex((data: IStaff) => data.name === item.staff)
      this.$set(this.$data.tableData[staffIndex], item.type, (this.$data.tableData[staffIndex][item.type] || 0) + item.num)
    })

  }
  cellClick (row: any, column: any, cell: any) {
    this.$set(this.$data, 'activeCell', {
      row: row.name,
      column: column.label,
      value: row.time
    })
  }
}
