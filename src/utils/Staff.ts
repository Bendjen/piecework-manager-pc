import store from 'store'
import { MessageBox, Notification } from 'element-ui'
// import onfire from 'onfire.js'
import { IStaff } from '@/declare.d.ts'

export function add ({
  name,
  short
}: {
  name: string,
  short: string
}) {

  return new Promise((resolve, reject) => {
    // 更新员工列表
    let staffList = store.get('STAFF_LIST') || []
    let newStaff = { name, short, id: store.get('LATELY_ID') + 1 }

    if (staffList.find((item: IStaff) => item.name === name)) {
      MessageBox.alert('添加失败，已存在同名员工', '提示').catch(e => e)
      reject()
    } else if (staffList.find((item: IStaff) => item.short === short)) {
      MessageBox.alert('添加失败，存在相同的缩写，请更换', '提示').catch(e => e)
      reject()
    } else {
      store.set('STAFF_LIST', [...staffList, newStaff])
      store.set('LATELY_ID', store.get('LATELY_ID') + 1)
      Notification.success(`已添加员工：${name}`)
      resolve(staffList.length)
    }
  })
}

export function remove ({
  id,
  name
}: {
  id?: number
  name?: string
}) {

  return new Promise((resolve, reject) => {
    let staffList = store.get('STAFF_LIST')
    let index = staffList.findIndex(
      (item: IStaff) => item.name === name || item.id === id
    )
    if (index !== -1) {
      staffList.splice(index, 1)
      store.set('STAFF_LIST', staffList)
      Notification.success({ message: `已删除员工：${name}`, title: '成功' })
      resolve(index)
    } else {
      MessageBox.alert('找不到该员工', '错误').catch(e => e)
      reject()
    }
  })

}

export function changeName ({
  primeName,
  newName
}: {
  primeName: string,
  newName: string
}) {
  return new Promise((resolve, reject) => {
    let staffList = store.get('STAFF_LIST')
    let index = staffList.findIndex(
      (item: IStaff) => item.name === primeName
    )
    if (staffList.findIndex(
      (item: IStaff) => item.name === newName
    ) !== -1) {
      MessageBox.alert(`已存在${newName},请确认`, '错误').catch(e => e)
      return reject()
    }
    if (index !== -1) {
      const newStaff = { ...staffList[index], name: newName }
      staffList.splice(index, 1, newStaff)
      store.set('STAFF_LIST', staffList)
      Notification.success({ message: `${primeName} 变更为 ${newName}`, title: '员工名称变更' })
      return resolve(index)
    } else {
      MessageBox.alert('找不到该员工', '错误').catch(e => e)
      return reject()
    }
  })
}

export function changeShort ({
  primeShort,
  newShort
}: {
  primeShort: string,
  newShort: string
}) {
  return new Promise((resolve, reject) => {
    let staffList = store.get('STAFF_LIST')
    let index = staffList.findIndex(
      (item: IStaff) => item.short === primeShort
    )
    let existIndex = staffList.findIndex(
      (item: IStaff) => item.name === newShort
    )
    if (existIndex !== -1) {
      MessageBox.alert(`已存在员工${staffList[existIndex].name}采用缩写${newShort},请确认`, '错误').catch(e => e)
      return reject()
    }
    if (index !== -1) {
      const newStaff = { ...staffList[index], short: newShort }
      staffList.splice(index, 1, newStaff)
      store.set('STAFF_LIST', staffList)
      Notification.success({ message: `${primeShort} 变更为 ${newShort}`, title: '员工缩写变更' })
      resolve(index)
    } else {
      MessageBox.alert('找不到该员工', '错误').catch(e => e)
      reject()
    }
  })
}
