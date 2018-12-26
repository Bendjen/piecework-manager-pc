import store from 'store'
import NP from 'number-precision'
import { MessageBox } from 'element-ui'
import dayjs from 'dayjs'
import { IRecord } from '@/declare.d.ts'

export function itemTypeList () {
  let list = store.get('ITEM_TYPE_LIST').map((item: any) => item)
  return list
}

export function staffList () {
  let list = store.get('STAFF_LIST').map((item: any) => item)
  return list
}

export function operationRecord () {
  let list = store.get('OPERATION_RECORD_LIST') || []
  list.map((item: IRecord) => {
    return { ...item,num: item.num - 0 }
  })
  list.reverse()
  return list
}

// 筛选目标记录
export function recordFilter ({
  date = new Date(),
  unit = 'month',
  action = 'PIECE_RECORD',
  staff = '',
  type = ''
}: any) {
  let list = store.get('OPERATION_RECORD_LIST')
  let targetMonthStart = dayjs(date).startOf(unit)
  let targetMonthEnd = dayjs(date).endOf(unit)
  let result = list.filter((item: any) => {
    const staffFilter = staff ? item.staff === staff : true
    const typeFilter = type ? item.type === type : true
    return (
      dayjs(item.time).isAfter(targetMonthStart) &&
      dayjs(item.time).isBefore(targetMonthEnd) &&
      item.action === action && staffFilter && typeFilter
    )
  })
  return result.map((item: IRecord) => {
    return { ...item,num: item.num - 0 }
  })
}

// 出货汇总
export function exportSummary (date = new Date(), unit = 'month') {
  // 数据初始化为0
  let exportSummary: any = []
  recordFilter({
    date,
    unit,
    action: 'GOODS_EXPORT'
  }).forEach((item: IRecord) => {
    let targetIndex = exportSummary.findIndex(
      (record: IRecord) => record.type === item.type
    )
    if (targetIndex === -1) {
      exportSummary.push({ type: item.type, num: 0 })
      targetIndex = exportSummary.findIndex((record: IRecord) => record.type === item.type)
    }
    exportSummary[targetIndex].num = NP.plus(
      exportSummary[targetIndex].num || 0,
      item.num
    )
  })

  return exportSummary
}
