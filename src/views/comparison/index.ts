import Vue from 'vue'
import './index.scss'
import { Component } from 'vue-property-decorator'
import { Input } from 'element-ui'
import * as Fetch from '@/utils/Fetch'
import dayjs from 'dayjs'
import { IRecord } from '@/declare'
import { IComparisonItem } from './declare.d'

Vue.use(Input)

@Component
export default class Comparison extends Vue {
  name = 'Comparison'
  data () {
    return {
      chartData: [],
      scale: [{
        dataKey: '计单',
        min: 0,
        max: 200
      }, {
        dataKey: '出货',
        min: 0,
        max: 200
      }],
      height: 680,
      month: dayjs().format('YYYY-MM'),
      axisLabel: {
        textStyle: {
          fill: '#fdae6b'
        }
      },
      axisGrid: null,
      gemoSize: 3,

      legendCustom: true,
      legendAllowAllCanceled: true,
      legendItems: [
        { value: '计单', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
        { value: '出货', marker: { symbol: 'hyphen', stroke: '#fdae6b', radius: 5, lineWidth: 3 } }
      ],
      legendOnClick: (ev: any, chart: any) => {
        const item = ev.item
        const value = item.value
        const checked = ev.checked
        const geoms = chart.getAllGeoms()
        for (let i = 0; i < geoms.length; i++) {
          const geom = geoms[i]
          if (geom.getYScale().field === value) {
            if (checked) {
              geom.show()
            } else {
              geom.hide()
            }
          }
        }
      }
    }
  }
  mounted () {
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
      const max = Math.max.apply(Math,chartData.map((item: IComparisonItem) => Math.max(item['出货'],item['计单'])))
      this.$set(this.$data.scale[0], 'max', max)
      this.$set(this.$data.scale[1], 'max', max)
      this.$data.chartData = chartData
    } else {
      this.$data.chartData = []
    }
  }
}
