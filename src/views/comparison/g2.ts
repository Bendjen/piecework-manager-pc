import G2 from '@antv/g2'
export default function () {
  const chart = new G2.Chart({
    container: 'chart',
    forceFit: true,
    height: 600
  })
  chart.source([])
  chart.legend({
    custom: true,
    allowAllCanceled: true,
    items: [
      { value: '计单', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
      { value: '出货', marker: { symbol: 'hyphen', stroke: '#fdae6b', radius: 5, lineWidth: 3 } }
    ]
  })

  chart.interval().position('type*计单').color('#3182bd')
  chart.line().position('type*出货').color('#fdae6b').size(3).shape('smooth')
  chart.point().position('type*出货').color('#fdae6b').size(3).shape('circle')
  chart.render()
  return chart
}
