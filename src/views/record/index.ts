import Vue from 'vue'
import './index.scss'
import { Component } from 'vue-property-decorator'
import { Table, TableColumn, Input } from 'element-ui'
import data from '@/data'
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Input)

@Component
export default class Record extends Vue {
  name = 'Record'
  data () {
    return {
      itemType: data['ITEM_TYPE_LIST'],
      tableData: data['STAFF_LIST'],
      activeCell: {
        row: '',
        column: '',
        value: '7787'
      }
    }
  }
  cellClick (row: any, column: any, cell: any) {
    this.$set(this.$data, 'activeCell', {
      row: row.name,
      column: column.label,
      value: row.time
    })
  }
}
