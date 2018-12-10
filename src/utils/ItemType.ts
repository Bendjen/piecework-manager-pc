import store from 'store'
import { MessageBox, Notification } from 'element-ui'
import { IItemStaff } from '@/declare.d.ts'

export function add ({
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
    MessageBox.alert('添加失败，已存在同名型号','提示').catch(e => e)
    return false
  } else {
    store.set('ITEM_TYPE_LIST', [...itemTypeList, newType])
  }

  Notification.success({ message: `添加型号 ${name}`, title: '成功' })
  callback && callback()
}
