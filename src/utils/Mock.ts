import store from 'store'
const Mock = require('mockjs')
import dayjs from 'dayjs'
import { Notification } from 'element-ui'

const Random = Mock.Random
const staffMockList = [
  { name: '张超', short: 'zc', id: 1 },
  { name: '李快', short: 'lk', id: 2 },
  { name: '王胜利', short: 'wsl', id: 3 },
  { name: '大壮', short: 'dz', id: 4 },
  { name: '小马', short: 'xm', id: 5 },
  { name: '胡一统', short: 'hyt', id: 6 },
  { name: '阿美', short: 'am', id: 8 },
  { name: '康康', short: 'kk', id: 9 },
  { name: '王鹤', short: 'wh', id: 10 },
  { name: '张立达', short: 'zld', id: 11 },
  { name: '李猛', short: 'lm', id: 12 },
  { name: '图图', short: 'tt', id: 13 },
  { name: '王阿新', short: 'wax', id: 14 },
  { name: '蟋蟀', short: 'xs', id: 15 },
  { name: '魏琳琳', short: 'wll', id: 16 },
  { name: '周立', short: 'zl', id: 17 },
  { name: '胡大力', short: 'hdl', id: 18 },
  { name: '阿雅', short: 'ay', id: 19 },
  { name: '陈亚男', short: 'cyn', id: 20 }
]
const itemTypeMockList = [
  { name: '即日快送', price: Random.natural(20, 25) },
  { name: '次晨快送', price: Random.natural(15, 20) },
  { name: '标准快送', price: Random.natural(5, 15) },
  { name: '特重快送', price: Random.natural(60, 100) },
  { name: '特惠类', price: Random.natural(5, 10) },
  { name: '进口类', price: Random.natural(15, 35) },
  { name: '信件类', price: Random.natural(20, 30) },
  { name: '食品类', price: Random.natural(3, 13) },
  { name: '电子类', price: Random.natural(20, 60) },
  { name: '贵奢类', price: Random.natural(100, 200) }
]
Random.extend({
  constellation: function () {
    let constellations = [1, 2]
    return this.pick(constellations)
  }
})

export default function () {
  const STAFF_LIST = []
  for (let i = 1; i <= Random.natural(6, 10); i++) {
    STAFF_LIST.push(staffMockList.splice(Random.natural(0, staffMockList.length - 1), 1)[0])
  }
  const ITEM_TYPE_LIST = []
  for (let i = 1; i <= Random.natural(4, 8); i++) {
    ITEM_TYPE_LIST.push(itemTypeMockList.splice(Random.natural(0, itemTypeMockList.length - 1), 1)[0])
  }
  const OPERATION_RECORD_LIST = []
  for (let i = 1; i <= Random.natural(10, 30); i++) {
    OPERATION_RECORD_LIST.push({
      type: ITEM_TYPE_LIST[Random.natural(0, ITEM_TYPE_LIST.length - 1)].name,
      staff: STAFF_LIST[Random.natural(0, STAFF_LIST.length - 1)].name,
      num: Random.natural(1, 20),
      time: dayjs().subtract(Random.natural(0,600), 'minute'),
      action: 'PIECE_RECORD',
      actionName: '员工计单'
    })
  }
  for (let i = 1; i <= Random.natural(50, 200); i++) {
    OPERATION_RECORD_LIST.push({
      type: ITEM_TYPE_LIST[Random.natural(0, ITEM_TYPE_LIST.length - 1)].name,
      staff: STAFF_LIST[Random.natural(0, STAFF_LIST.length - 1)].name,
      num: Random.natural(1, 20),
      time: dayjs().subtract(Random.natural(0,50), 'day'),
      action: 'PIECE_RECORD',
      actionName: '员工计单'
    })
  }
  for (let i = 1; i <= Random.natural(5, 15); i++) {
    OPERATION_RECORD_LIST.push({
      type: ITEM_TYPE_LIST[Random.natural(0, ITEM_TYPE_LIST.length - 1)].name,
      num: Random.natural(20, 80),
      time: dayjs().subtract(Random.natural(0,50), 'minute'),
      action: 'GOODS_EXPORT',
      actionName: '出货'
    })
  }
  for (let i = 1; i <= Random.natural(20, 30); i++) {
    OPERATION_RECORD_LIST.push({
      type: ITEM_TYPE_LIST[Random.natural(0, ITEM_TYPE_LIST.length - 1)].name,
      num: Random.natural(60, 100),
      time: dayjs().subtract(Random.natural(0,50), 'day'),
      action: 'GOODS_EXPORT',
      actionName: '出货'
    })
  }
  store.set('STAFF_LIST', STAFF_LIST)
  store.set('ITEM_TYPE_LIST', ITEM_TYPE_LIST)
  store.set('OPERATION_RECORD_LIST', OPERATION_RECORD_LIST)
  store.set('LATELY_ID', 20)
  Notification.success({
    message: '已为您随机生成数据',
    title: '成功'
  })
}
