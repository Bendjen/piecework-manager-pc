import G2 from '@antv/g2'
export default function () {
  const chart = new G2.Chart({
    container: 'chart',
    forceFit: true,
    height: 620
  })
  chart.source([])
  chart.coord('rect').transpose()
  chart
    .intervalStack()
    .position('name*数量')
    .color('工种')
    .style({
      cursor: 'pointer'
    })
  chart.render()
  chart.on('interval:click', (ev: any) => {
    console.log(ev)
  })
  return chart
}
