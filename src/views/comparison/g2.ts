import G2 from '@antv/g2'
import Slider from '@antv/g2-plugin-slider'

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
      {
        value: '计单',
        marker: { symbol: 'square', fill: '#3182bd', radius: 5 }
      },
      {
        value: '出货',
        marker: { symbol: 'hyphen', stroke: '#fdae6b', radius: 5, lineWidth: 3 }
      }
    ]
  })

  chart
    .interval()
    .position('type*计单')
    .color('#3182bd')
    .style({
      cursor: 'pointer'
    })
  chart
    .line()
    .position('type*出货')
    .color('#fdae6b')
    .size(3)
    .shape('smooth')
  chart
    .point()
    .position('type*出货')
    .color('#fdae6b')
    .size(3)
    .shape('circle')
    .style({
      cursor: 'pointer'
    })
  chart.render()

  // const slider = new Slider({
  //   container: 'slider', // dom 容器 id 或者 dom 容器对象
  //   width: 600, // slider 的宽度，默认为 'auto'，即自适应宽度
  //   height: 26, // slider 的高度，默认为 '26px'
  //   padding: [ 20, 120, 100 ], // slider 所在画布 canvas 的内边距，用于对齐图表，默认与图表默认的 padding 相同
  //   start: '2015-04-07', // 和状态量对应，滑块的起始点数值，如果是时间类型，建议将其转换为时间戳，方便数据过滤
  //   end: '2015-08-01', // 和状态量对应，滑块的结束点数值，如果是时间类型，建议将其转换为时间戳，方便数据过滤
  //   minSpan: 30 * 24 * 60 * 60 * 1000, // 可选，用于设置滑块的最小范围，时间类型的数值必须使用时间戳，这里设置最小范围为 30 天
  //   maxSpan: 120 * 24 * 60 * 60 * 1000, // 可选，用于设置滑块的最大范围，时间类型的数值必须使用时间戳，这里设置最大范围为 120 天
  //   data: [], // slider 的数据源
  //   xAxis: 'time', // 背景图的横轴对应字段，同时为数据筛选的字段
  //   yAxis: 'volumn' // 背景图的纵轴对应字段
  //   // onChange: ({ startValue, endValue }) => {
  //   //   ds.setState('start', startValue)
  //   //   ds.setState('end', endValue)
  //   // } // 更新数据状态量的回调函数
  // })
  // slider.render() // 渲染

  return chart
}
