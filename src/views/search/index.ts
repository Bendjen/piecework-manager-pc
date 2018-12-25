import Vue from 'vue'
import './index.scss'
import { Component } from 'vue-property-decorator'
import { Select, DatePicker, Option } from 'element-ui'
import { Global, registerShape } from 'viser-vue'
import * as Fetch from '@/utils/Fetch'
import dayjs from 'dayjs'
import { IRecord } from '@/declare'
import { IChartsItem } from './declare.d'

Vue.use(Select)
Vue.use(Option)
Vue.use(DatePicker)

function getRectPath (points: any) {
  const path = []
  for (let i = 0; i < points.length; i++) {
    const point = points[i]
    if (point) {
      const action = i === 0 ? 'M' : 'L'
      path.push([action, point.x, point.y])
    }
  }
  const first = points[0]
  path.push(['L', first.x, first.y])
  path.push(['z'])
  return path
}

function getFillAttrs (cfg: any) {
  const defaultAttrs = Global.shape.interval
  const attrs = Object.assign({}, defaultAttrs, {
    fill: cfg.color,
    stroke: cfg.color,
    fillOpacity: cfg.opacity
  }, cfg.style)
  return attrs
}

registerShape('interval', 'waterfall', {
  draw (cfg: any, container: any) {
    const attrs = getFillAttrs(cfg)
    let rectPath = getRectPath(cfg.points)
    rectPath = this.parsePath(rectPath)
    const interval = container.addShape('path', {
      attrs: Object.assign(attrs, {
        path: rectPath
      })
    })

    if (cfg.nextPoints) {
      let linkPath = [
        ['M', cfg.points[2].x, cfg.points[2].y],
        ['L', cfg.nextPoints[0].x, cfg.nextPoints[0].y]
      ]

      if (cfg.nextPoints[0].y === 0) {
        linkPath[1] = ['L', cfg.nextPoints[1].x, cfg.nextPoints[1].y]
      }
      linkPath = this.parsePath(linkPath)
      container.addShape('path', {
        attrs: {
          path: linkPath,
          stroke: '#8c8c8c',
          lineDash: [4, 2]
        }
      })
    }

    return interval
  }
})

const data: any = [
  { type: '日用品', money: 300 },
  { type: '伙食费', money: 900 },
  { type: '交通费', money: 200 },
  { type: '水电费', money: 300 },
  { type: '房租', money: 1200 },
  { type: '商场消费', money: 1000 },
  { type: '应酬交际', money: 2000 },
  { type: '合计', money: 5900 }
]

for (let i = 0; i < data.length; i++) {
  const item: any = data[i]

  if (i > 0 && i < data.length - 1) {
    if (Array.isArray(data[i - 1].money)) {
      item.money = [data[i - 1].money[1], item.money + data[i - 1].money[1]]
    } else {
      item.money = [data[i - 1].money, item.money + data[i - 1].money]
    }
  }
}

const items = [
  { value: '各项花销', fill: '#1890FF', marker: 'square' },
  { value: '合计', fill: '#8c8c8c', marker: 'square' }
]

const color = ['type', (type: any) => {
  if (type === '合计') {
    return '#8c8c8c'
  }
  return '#1890FF'
}]

const tooltip = ['type*money', (type: any, money: any) => {
  if (Array.isArray(money)) {
    return {
      name: '生活费',
      value: money[1] - money[0]
    }
  }

  return {
    name: '生活费',
    value: money
  }
}]

@Component
export default class Search extends Vue {
  name = 'Search'
  data () {
    return {
      chartsData: [],
      height: 600,
      items,
      color,
      tooltip,
      value: '',
      params: {
        action: '计单',
        staff: '',
        type: '',
        month: dayjs().format('YYYY-MM')
      },
      actionList: ['计单', '出货'],
      staffList: Fetch.staffList(),
      itemTypeList: Fetch.itemTypeList(),
      options: []
    }
  }
  filter () {
    const { action, staff, type, month } = this.$data.params
    let chartsData: any = []
    if (!staff && action !== '出货') {
      return this.$MessageBox.alert('请先选择员工', '提示')
    } else if (!type) {
      return this.$MessageBox.alert('请先选择工种', '提示')
    } else if (!month) {
      return this.$MessageBox.alert('请先选择月份', '提示')
    }
    if (!action) {
      this.$MessageBox.alert('请先选择类型', '提示')
    } else if (action === '计单') {
      let lastNum = 0
      const pieceRecord = Fetch.recordFilter({ date: month, unit: 'month', action: 'PIECE_RECORD', staff, type })
      pieceRecord.forEach((item: IRecord) => {
        const targetIndex = chartsData.findIndex((data: IChartsItem) => data.type === dayjs(item.time).format('MM-DD'))
        if (targetIndex !== -1) {
          chartsData.splice(targetIndex, 1, { type: dayjs(pieceRecord[targetIndex].time).format('MM-DD HH:mm:ss'), money: [this.$NP.minus(lastNum, pieceRecord[targetIndex].num), lastNum] })
          chartsData.push({ type: dayjs(item.time).format('MM-DD HH:mm:ss'), money: [lastNum, this.$NP.plus(lastNum, item.num)] })
        } else {
          chartsData.push({ type: dayjs(item.time).format('MM-DD'), money: [lastNum, this.$NP.plus(lastNum, item.num)] })
        }
        lastNum = this.$NP.plus(lastNum, item.num)
      })
      chartsData.push({ type: '合计', money: pieceRecord.reduce((pre: number, cur: IChartsItem) => this.$NP.plus(pre, cur.num), 0) })
      console.log(chartsData)
      console.log(data)
      this.$data.chartsData = chartsData
    } else if (action === '出货') {
      const exportRecord = Fetch.recordFilter({ date: month, unit: 'month', action: 'GOODS_EXPORT', type })
      chartsData = exportRecord.map((item: IRecord) => {
        return { type: dayjs(item.time).format('MM-DD'), money: item.num }
      })
      this.$data.chartsData = chartsData
    }
  }
}
