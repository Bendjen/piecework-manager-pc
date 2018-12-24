import Vue from 'vue'
import './index.scss'
import { Component } from 'vue-property-decorator'
import { Input } from 'element-ui'
import * as Fetch from '@/utils/Fetch'
import dayjs from 'dayjs'
import { IRecord } from '@/declare'
import { IComparisonItem } from './declare.d'

Vue.use(Input)

const chartData = [
  { time: '10:10', waiting: 2, people: 2 },
  { time: '10:15', waiting: 6, people: 3 },
  { time: '10:20', waiting: 2, people: 5 },
  { time: '10:25', waiting: 9, people: 1 },
  { time: '10:30', waiting: 2, people: 3 },
  { time: '10:35', waiting: 2, people: 1 },
  { time: '10:40', waiting: 1, people: 2 }
]

@Component
export default class Comparison extends Vue {
  name = 'Comparison'
  data () {
    return {
      chartData: chartData,
      scale: [{
        dataKey: 'piece',
        min: 0,
        max: 200
      }, {
        dataKey: 'export',
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
    // return false
    let chartData: IComparisonItem[] = []
    const pieceRecordList: IRecord[] = Fetch.recordFilter({ date: this.$data.month, unit: 'month', action: 'PIECE_RECORD' })
    const exportRecordList: IRecord[] = Fetch.recordFilter({ date: this.$data.month, unit: 'month', action: 'GOODS_EXPORT' })
    exportRecordList.forEach((item: IRecord) => {
      let targetIndex = chartData.findIndex((data: IComparisonItem) => data.type === item.type)
      if (targetIndex === -1) {
        chartData.push({ type: item.type, piece: 0, export: 0 })
        targetIndex = chartData.length - 1
      }
      chartData[targetIndex].export = this.$NP.plus(chartData[targetIndex].export, item.num)
    })
    pieceRecordList.forEach((item: IRecord) => {
      let targetIndex = chartData.findIndex((data: IComparisonItem) => data.type === item.type)
      if (targetIndex === -1) {
        chartData.push({ type: item.type, piece: 0, export: 0 })
        targetIndex = chartData.length - 1
      }
      chartData[targetIndex].piece = this.$NP.plus(chartData[targetIndex].piece, item.num)
    })
    // const max = Math.max(Math.max.apply(pieceRecordList.map((item: IRecord) => parseInt(item.num))), Math.max.apply(exportRecordList.map((item: IRecord) => parseInt(item.num))))
    // this.$set(this.$data.scale[0], 'max', max + 50)
    // this.$set(this.$data.scale[1], 'max', max + 50)
    this.$data.chartData = chartData
  }
}
