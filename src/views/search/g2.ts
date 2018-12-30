import G2 from '@antv/g2'
import NP from 'number-precision'

export default function () {
  const chart = new G2.Chart({
    container: 'chart',
    forceFit: true,
    height: 600
  })
  chart.source([])
  // 自定义图例
  chart.legend({
    // custom: true,
    clickable: false,
    items: [
      { value: '分布', fill: '#1890FF', marker: 'square' },
      { value: '合计', fill: '#8c8c8c', marker: 'square' }
    ]
  })
  chart.interval()
  .position('time*num*type')
  .style({
    cursor: 'pointer'
  })
  .color('time', function (time: any) {
    if (time === '合计') {
      return '#8c8c8c'
    }
    return '#1890FF'
  })
  .color('type',function (type: any) {
    if (type === '合计') {
      return '#8c8c8c'
    }
  })
  .tooltip('time*num*type', function (time: any, num: any,type: any) {
    if (Array.isArray(num)) {
      return {
        name: type,
        value: NP.minus(num[1],num[0])
      }
    }
    return {
      name: type,
      value: num
    }
  })
  .shape('waterfall')
  chart.render()
  return chart
}
