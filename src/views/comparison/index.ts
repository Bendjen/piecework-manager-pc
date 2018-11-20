import Vue from 'vue'
import './index.scss'
import { Component } from 'vue-property-decorator'
import { Input } from 'element-ui'
// import data from '@/data'

Vue.use(Input)

const data = [
  { time: '10:10', call: 4, waiting: 2, people: 2 },
  { time: '10:15', call: 2, waiting: 6, people: 3 },
  { time: '10:20', call: 13, waiting: 2, people: 5 },
  { time: '10:25', call: 9, waiting: 9, people: 1 },
  { time: '10:30', call: 5, waiting: 2, people: 3 },
  { time: '10:35', call: 8, waiting: 2, people: 1 },
  { time: '10:40', call: 13, waiting: 1, people: 2 }
]

const scale = [{
  dataKey: 'call',
  min: 0
}, {
  dataKey: 'people',
  min: 0
}, {
  dataKey: 'waiting',
  min: 0
}]

@Component
export default class Comparison extends Vue {
  name = 'Comparison'
  data () {
    return {
      data,
      scale,
      height: 680,

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
        { value: 'waiting', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
        { value: 'people', marker: { symbol: 'hyphen', stroke: '#fdae6b', radius: 5, lineWidth: 3 } }
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
}
