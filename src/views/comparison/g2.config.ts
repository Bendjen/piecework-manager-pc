export default {
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
