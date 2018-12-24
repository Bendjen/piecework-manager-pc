import store from 'store'
import { MessageBox, Notification } from 'element-ui'
import { IItemStaff, IRecord } from '@/declare.d.ts'
import * as Fetch from '@/utils/Fetch'
import dayjs from 'dayjs'

export function goodsExport ({
  type,
  num,
  time = dayjs()
}: {
  type: string,
  num: number,
  time?: any
}) {
  return new Promise((resolve, reject) => {
    let itemTypeList = store.get('ITEM_TYPE_LIST') || []

    const targetIndex = itemTypeList.findIndex((item: IItemStaff) => item.name === type)
    if (targetIndex === -1) {
      MessageBox.alert(`不存在型号${type}`, '提示').catch(e => reject(e))
    } else {
      // 添加操作记录
      let operationRecorddList = store.get('OPERATION_RECORD_LIST') || []
      let newOperationRecord = { type, num, time, action: 'GOODS_EXPORT', actionName: '出货' }
      store.set('OPERATION_RECORD_LIST', [...operationRecorddList, newOperationRecord])
      Notification.success({ message: `${type} 出货 ${num} 万件`, title: '成功' })
      resolve()
    }
  })
}

export function pieceRecord ({
  type,
  num,
  staff,
  time = dayjs()
}: {
  type: string,
  num: number,
  staff: string,
  time?: any
}) {
  return new Promise((resolve, reject) => {
    let itemTypeList = store.get('ITEM_TYPE_LIST') || []

    const targetIndex = itemTypeList.findIndex((item: IItemStaff) => item.name === type)
    if (targetIndex === -1) {
      MessageBox.alert(`不存在型号${type}`, '提示').catch(e => reject(e))
    } else {
      // 添加操作记录
      let operationRecorddList = store.get('OPERATION_RECORD_LIST') || []
      let newOperationRecord = { type, num, staff, time, action: 'PIECE_RECORD', actionName: '员工记单' }
      store.set('OPERATION_RECORD_LIST', [...operationRecorddList, newOperationRecord])
      Notification.success({ message: `${type} 计单  ${num} 万件`, title: '成功' })
      resolve()
    }
  })
}

export function editRecord ({
  type,
  num,
  staff,
  time = dayjs()
}: {
  type: string,
  num: number,
  staff: string,
  time?: any
}) {
  return new Promise((resolve,reject) => {
    let operationRecorddList = store.get('OPERATION_RECORD_LIST') || []
    let targetRecord = operationRecorddList.find((item: IRecord) => {
      return (dayjs(time).isSame(dayjs(item.time),'day') && type === item.type && staff === item.staff)
    })
    if (targetRecord) {
      targetRecord.num = num
      store.set('OPERATION_RECORD_LIST',operationRecorddList)
      Notification.success({ message: `${type} 变更为  ${num} 万件`, title: '成功' })
      resolve()
    } else {
      return pieceRecord({ type,num,staff,time })
    }

  })

}
