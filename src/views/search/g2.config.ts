import { Global, registerShape } from 'viser-vue'
export default function () {
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

  const items = [
    { value: '分布', fill: '#1890FF', marker: 'square' },
    { value: '合计', fill: '#8c8c8c', marker: 'square' }
  ]

  const color = ['time', (time: any) => {
    if (time === '合计') {
      return '#8c8c8c'
    }
    return '#1890FF'
  }]

  const tooltip = ['time*num', (time: any, num: any) => {
    if (Array.isArray(num)) {
      return {
        name: '数量',
        value: num[1] - num[0]
      }
    }
    return {
      name: '数量',
      value: num
    }
  }]

  const height = 600

  return { items, color, tooltip, height }
}
