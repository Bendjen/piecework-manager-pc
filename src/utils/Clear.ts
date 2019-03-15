import store from 'store'
import { Notification } from 'element-ui'

export default function () {
  store.set('STAFF_LIST', [])
  store.set('ITEM_TYPE_LIST', [])
  store.set('OPERATION_RECORD_LIST', [])
  store.set('LATELY_ID', 0)
  Notification.success({
    message: '已清除所有数据',
    title: '成功'
  })
}
