import Vue from 'vue'
import './index.scss'
import { Component } from 'vue-property-decorator'
import { Input, DatePicker } from 'element-ui'
import * as Fetch from '@/utils/Fetch'
import dayjs from 'dayjs'
import { IRecord } from '@/declare'
import { IComparisonItem } from './declare.d'
import G2Init from './g2'

Vue.use(Input)
Vue.use(DatePicker)

@Component
export default class Comparison extends Vue {
  name = 'Comparison'
  data () {
    return {
      chart: null,
      month: dayjs().format('YYYY-MM')
    }
  }
  mounted () {
    this.$data.chart = G2Init()
    this.$data.chart.on('interval:dblclick', (env: any) => {
      const { type } = env.data._origin
      this.$router.push({ name: 'search',params: {
        action: 'GOODS_EXPORT',
        type: type,
        month: this.$data.month
      } })
    })
    this.$data.chart.on('point:dblclick', (env: any) => {
      const { type } = env.data._origin
      this.$router.push({ name: 'search',params: {
        action: 'PIECE_RECORD',
        type: type,
        month: this.$data.month
      } })
    })
    this.freshCharts()
  }

  freshCharts () {
    let chartData: IComparisonItem[] = []
    const pieceRecordList: IRecord[] = Fetch.recordFilter({ date: this.$data.month, unit: 'month', action: 'PIECE_RECORD' })
    const exportRecordList: IRecord[] = Fetch.recordFilter({ date: this.$data.month, unit: 'month', action: 'GOODS_EXPORT' })
    if (pieceRecordList.length > 0 || exportRecordList.length > 0) {
      exportRecordList.forEach((item: IRecord) => {
        let targetIndex = chartData.findIndex((data: IComparisonItem) => data.type === item.type)
        if (targetIndex === -1) {
          chartData.push({ type: item.type, '计单': 0, '出货': 0 })
          targetIndex = chartData.length - 1
        }
        chartData[targetIndex]['出货'] = this.$NP.plus(chartData[targetIndex]['出货'], item.num)
      })
      pieceRecordList.forEach((item: IRecord) => {
        let targetIndex = chartData.findIndex((data: IComparisonItem) => data.type === item.type)
        if (targetIndex === -1) {
          chartData.push({ type: item.type, '计单': 0, '出货': 0 })
          targetIndex = chartData.length - 1
        }
        chartData[targetIndex]['计单'] = this.$NP.plus(chartData[targetIndex]['计单'], item.num)
      })
      const max = Math.max.apply(Math, chartData.map((item: IComparisonItem) => Math.max(item['出货'], item['计单'])))
      this.$data.chart.scale('计单', { max: max })
      this.$data.chart.scale('出货', { max: max })
      this.$data.chart.changeData(chartData)
    } else {
      this.$data.chart.changeData([])
    }
  }
}
