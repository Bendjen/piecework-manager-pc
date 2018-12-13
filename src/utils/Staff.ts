import store from 'store'
import { MessageBox, Notification } from 'element-ui'
// import onfire from 'onfire.js'
import { IStaff } from '@/declare.d.ts'

export function add ({
  name,
  callback
}: {
  name: string,
  callback?: Function
}) {

  // 更新员工列表
  let staffList = store.get('STAFF_LIST') || []
  let newStaff = { name, id: store.get('LATELY_ID') + 1 }

  if (staffList.find((item: IStaff) => item.name === name)) {
    MessageBox.alert('添加失败，已存在同名员工', '提示').catch(e => e)
    return false
  } else {
    store.set('STAFF_LIST', [...staffList, newStaff])
    store.set('LATELY_ID', store.get('LATELY_ID') + 1)
  }

  Notification.success(`已添加员工：${name}`)

  callback && callback(staffList.length)
}

export function remove ({
  id,
  name,
  callback
}: {
  id ?: number
  name ?: string
  callback ?: Function
}) {
  let staffList = store.get('STAFF_LIST')
  let index = staffList.findIndex(
      (item: IStaff) => item.name === name || item.id === id
    )
  if (index !== -1) {
    staffList.splice(index, 1)
    store.set('STAFF_LIST', staffList)
    Notification.success({ message: `已删除员工：${name}`,title: '成功' })
    callback && callback(index)
  } else {
    MessageBox.alert('找不到该员工','错误').catch(e => e)
  }

}

export function changeName ({
    id,
    primeName,
    newName,
    callback
  }: {
    id?: number,
    primeName?: string,
    newName: string,
    callback?: Function
  }) {
  let staffList = store.get('STAFF_LIST')
  let index = staffList.findIndex(
      (item: IStaff) => item.name === primeName || item.id === id
    )
  if (index !== -1) {
    const newStaff = { ...staffList[index],name: newName }
    staffList.splice(index, 1,newStaff)
    store.set('STAFF_LIST', staffList)
    Notification.success({ message: `${primeName} 变更为 ${newName}`,title: '成功' })
    callback && callback(index)
  } else {
    MessageBox.alert('找不到该员工','错误').catch(e => e)
  }

}
