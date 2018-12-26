import Vue from 'vue'
import './index.scss'
import { Component } from 'vue-property-decorator'
import { Select, DatePicker, Option } from 'element-ui'
import * as Fetch from '@/utils/Fetch'
import dayjs from 'dayjs'
import { IRecord } from '@/declare'
import { IChartsItem } from './declare.d'
import G2Config from './g2.config'

Vue.use(Select)
Vue.use(Option)
Vue.use(DatePicker)

@Component
export default class Search extends Vue {
  name = 'Search'
  data () {
    return {
      chartsData: [],
      g2Config: G2Config(),
      params: {
        action: 'PIECE_RECORD',
        staff: '',
        type: '',
        month: dayjs().format('YYYY-MM')
      },
      actionList: [{ label: '计单', value: 'PIECE_RECORD' }, { label: '出货', value: 'GOODS_EXPORT' }],
      staffList: Fetch.staffList(),
      itemTypeList: Fetch.itemTypeList()
    }
  }
  filter () {
    const { action, staff, type, month } = this.$data.params
    let chartsData: any = []
    if (!staff && action !== 'GOODS_EXPORT') {
      return this.$MessageBox.alert('请先选择员工', '提示')
    } else if (!type) {
      return this.$MessageBox.alert('请先选择工种', '提示')
    } else if (!month) {
      return this.$MessageBox.alert('请先选择月份', '提示')
    }
    if (!action) {
      this.$MessageBox.alert('请先选择类型', '提示')
    } else {
      let lastNum = 0
      const pieceRecord = Fetch.recordFilter({ date: month, unit: 'month', action: action, staff: action === 'GOODS_EXPORT' ? '' : staff, type })
      pieceRecord.forEach((item: IRecord) => {
        const sameDayNum = pieceRecord.filter((record: IRecord) => dayjs(record.time).format('MM-DD') === dayjs(item.time).format('MM-DD')).length
        if (sameDayNum > 1) {
          chartsData.push({ time: dayjs(item.time).format('MM-DD HH:mm:ss'), num: [lastNum, this.$NP.plus(lastNum, item.num)] })
        } else {
          chartsData.push({ time: dayjs(item.time).format('MM-DD'), num: [lastNum, this.$NP.plus(lastNum, item.num)] })
        }
        lastNum = this.$NP.plus(lastNum, item.num)
      })
      chartsData.push({ time: '合计', num: pieceRecord.reduce((pre: number, cur: IChartsItem) => this.$NP.plus(pre, cur.num), 0) })
      this.$data.chartsData = chartsData
    }
  }
  editRecord (data: any) {
    console.log(data)
  }
}
