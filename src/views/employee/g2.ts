import G2 from '@antv/g2'
export default function (id = 'chart') {
  const chart = new G2.Chart({
    container: id,
    forceFit: true,
    height: 380
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
