import store from 'store'
import Mock from './Mock'

export default function initData () {
  const staffList = store.get('STAFF_LIST')
  const itemTypeList = store.get('ITEM_TYPE_LIST')
  const operatiobRecordList = store.get('OPERATION_RECORD_LIST')
  const latelyId = store.get('LATELY_ID')

  if (staffList === undefined) {
    store.set('STAFF_LIST', [])
  }

  if (itemTypeList === undefined) {
    store.set('ITEM_TYPE_LIST', [])
  }

  if (operatiobRecordList === undefined) {
    store.set('OPERATION_RECORD_LIST', [])
  }

  if (latelyId === undefined) {
    store.set('LATELY_ID', 0)
  }

  if (staffList.length === 0 && itemTypeList.length === 0 && operatiobRecordList.length === 0) {
    Mock()
  } else if (location.href.includes('MOCK_FLAG')) {
    Mock()
  }

}
