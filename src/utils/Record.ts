import store from 'store'
import { MessageBox, Notification } from 'element-ui'
import { IItemStaff, IRecord } from '@/declare.d.ts'
import * as Fetch from '@/utils/Fetch'
import dayjs from 'dayjs'

export function goodsExport({
    type,
    num,
    time = dayjs()
}: {
  type: string;
  num: number;
  time?: any;
}) {
  return new Promise((resolve, reject) => {
    let itemTypeList = store.get('ITEM_TYPE_LIST') || []

    const targetIndex = itemTypeList.findIndex(
            (item: IItemStaff) => item.name === type
        )
    if (targetIndex === -1) {
      MessageBox.alert(`不存在型号${type}`, '提示').catch(e => reject(e))
    } else {
            // 添加操作记录
      let operationRecorddList = store.get('OPERATION_RECORD_LIST') || []
      let newOperationRecord = {
        type,
        num,
        time,
        action: 'GOODS_EXPORT',
        actionName: '出货'
      }
      store.set('OPERATION_RECORD_LIST', [
        ...operationRecorddList,
        newOperationRecord
      ])
      Notification.success({
        message: `${type} 出货 ${num} 万件`,
        title: '成功'
      })
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
  type: string;
  num: number;
  staff: string;
  time?: any;
}) {
  return new Promise((resolve, reject) => {
    let itemTypeList = store.get('ITEM_TYPE_LIST') || []

    const targetIndex = itemTypeList.findIndex(
            (item: IItemStaff) => item.name === type
        )
    if (targetIndex === -1) {
      MessageBox.alert(`不存在型号${type}`, '提示').catch(e => reject(e))
    } else {
            // 添加操作记录
      let operationRecorddList = store.get('OPERATION_RECORD_LIST') || []
      let newOperationRecord = {
        type,
        num,
        staff,
        time,
        action: 'PIECE_RECORD',
        actionName: '员工记单'
      }
      store.set('OPERATION_RECORD_LIST', [
        ...operationRecorddList,
        newOperationRecord
      ])
      Notification.success({
        message: `${type} 计单  ${num} 万件`,
        title: '成功'
      })
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
  type: string;
  num: number;
  staff: string;
  time?: any;
}) {
  return new Promise((resolve, reject) => {
    let operationRecordList = store.get('OPERATION_RECORD_LIST') || []
    let targetRecord = operationRecordList.find((item: IRecord) => {
      let ifSameStaff = staff ? staff === item.staff : true
      return (
                dayjs(time).isSame(dayjs(item.time)) &&
                type === item.type &&
                ifSameStaff
      )
    })
    if (targetRecord) {
      targetRecord.num = num
      store.set('OPERATION_RECORD_LIST', operationRecordList)
      Notification.success({
        message: `${type} 变更为  ${num} 万件`,
        title: '成功'
      })
      resolve()
    } else {
      return pieceRecord({ type, num, staff, time })
    }
  })
}

export function wholeDayEdit ({
    type,
    num,
    staff,
    time = dayjs()
}: {
  type: string;
  num: number;
  staff: string;
  time?: any;
}) {
  return new Promise((resolve, reject) => {
    let operationRecordList = store.get('OPERATION_RECORD_LIST') || []
    let targetRecords = operationRecordList.filter((item: IRecord) => {
      let ifSameStaff = staff ? staff === item.staff : true
      return (
                dayjs(time).isSame(dayjs(item.time), 'day') &&
                type === item.type &&
                ifSameStaff
      )
    })
    targetRecords.forEach((item: IRecord) => {
      deleteRecord({ type: item.type, staff: item.staff, time: item.time, ifNotify: false })
    })
    pieceRecord({ type, num, staff, time })
  })
}

export function deleteRecord ({
    type,
    num,
    staff,
    time = dayjs(),
    ifNotify = true
}: {
  type: string;
  num?: number;
  staff: string;
  time?: any;
  ifNotify?: boolean;
}) {
  return new Promise((resolve, reject) => {
    let operationRecorddList = store.get('OPERATION_RECORD_LIST') || []
    let targetIndex = operationRecorddList.findIndex((item: IRecord) => {
      let ifSameStaff = staff ? staff === item.staff : true
      return (
                dayjs(time).isSame(dayjs(item.time)) &&
                type === item.type &&
                ifSameStaff
      )
    })
    if (targetIndex !== -1) {
      operationRecorddList.splice(targetIndex, 1)
      store.set('OPERATION_RECORD_LIST', operationRecorddList)
      if (ifNotify) {
        Notification.success({
          message: `记单记录已删除`,
          title: '成功'
        })
      }
      resolve()
    } else {
      return MessageBox.alert('无法找到该记录', '提示')
    }
  })
}
