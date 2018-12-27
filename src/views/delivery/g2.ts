import G2 from '@antv/g2'
export default function () {
  const chart = new G2.Chart({
    container: 'chart',
    forceFit: true,
    height: 600
  })
  chart.source([])
  chart.interval().position('type*num').color('type').label('num', {
    labelEmit: true,
    textStyle: {
      fill: '#8c8c8c'
    }
  })
  chart.render()
  return chart
}
