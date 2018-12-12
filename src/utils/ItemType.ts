import store from 'store'
import { MessageBox, Notification } from 'element-ui'
import { IItemStaff } from '@/declare.d.ts'

export function addItem ({
  name,
  price,
  callback
}: {
  name: string;
  price: number;
  callback: Function;
}) {
  // 更新类型列表
  let itemTypeList = store.get('ITEM_TYPE_LIST') || []
  let newType = { name, price }

  if (itemTypeList.find((item: IItemStaff) => item.name === name)) {
    MessageBox.alert('添加失败，已存在同名型号', '提示').catch(e => e)
    return false
  } else {
    store.set('ITEM_TYPE_LIST', [...itemTypeList, newType])
  }

  Notification.success({ message: `添加型号 ${name}`, title: '成功' })
  callback && callback()
}

export function deleteItem ({
  name,
  callback
}: {
  name: string;
  callback: Function;
}) {
  // 更新类型列表
  let itemTypeList = store.get('ITEM_TYPE_LIST') || []

  const targetIndex = itemTypeList.findIndex(
    (item: IItemStaff) => item.name === name
  )
  itemTypeList.splice(targetIndex)
  store.set('ITEM_TYPE_LIST', itemTypeList)

  Notification.success({ message: `删除型号 ${name}`, title: '成功' })
  callback && callback()
}

export function changeName ({
  preName,
  newName,
  callback
}: {
  preName: string;
  newName: string;
  callback: Function;
}) {
  // 更新类型列表
  let itemTypeList = store.get('ITEM_TYPE_LIST') || []

  const targetIndex = itemTypeList.findIndex(
    (item: IItemStaff) => item.name === preName
  )
  const newItem = { ...itemTypeList[targetIndex], name: newName }
  itemTypeList.splice(targetIndex, 1, newItem)
  store.set('ITEM_TYPE_LIST', itemTypeList)

  Notification.success({
    message: `型号 ${preName} 变更为 ${newName} `,
    title: '成功'
  })
  callback && callback()
}

export function changePrice ({
  name,
  price,
  callback
}: {
  name: string;
  price: number;
  callback: Function;
}) {
  // 更新类型列表
  let itemTypeList = store.get('ITEM_TYPE_LIST') || []

  const targetIndex = itemTypeList.findIndex(
    (item: IItemStaff) => item.name === name
  )
  const newItem = { ...itemTypeList[targetIndex], price: price }
  const oldPrice = itemTypeList[targetIndex].price
  itemTypeList.splice(targetIndex, 1, newItem)
  store.set('ITEM_TYPE_LIST', itemTypeList)

  Notification.success({
    message: `型号 ${name} 价格由 ${oldPrice} 分，变更为 ${price} 分`,
    title: '成功'
  })
  callback && callback()
}
