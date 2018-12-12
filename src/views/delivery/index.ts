import Vue from 'vue'
import './index.scss'
import { Component } from 'vue-property-decorator'
import { Table, TableColumn, Input } from 'element-ui'
import * as ItemType from '@/utils/ItemType'
import * as Fetch from '@/utils/Fetch'
import { IRecord, IStaff } from '@/declare.d.ts'
import data from '@/data'
import { View } from '@antv/data-set'

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Input)

@Component
export default class Delivery extends Vue {
  name = 'Delivery'
  data () {
    return {
      data: [
        { year: '1951 年', sales: 38 },
        { year: '1952 年', sales: 52 },
        { year: '1956 年', sales: 61 },
        { year: '1957 年', sales: 145 },
        { year: '1958 年', sales: 48 },
        { year: '1959 年', sales: 38 },
        { year: '1960 年', sales: 38 },
        { year: '1962 年', sales: 38 }
      ],
      addItemDialog: false,
      itemListDialog: false,
      itemList: [],
      newItem: { name: '', price: '' },
      scale: [
        {
          dataKey: 'sales',
          tickInterval: 20
        }
      ],
      height: 600
    }
  }
  mounted () {
    this.freshItemList()
  }

  freshItemList () {
    this.$set(this.$data, 'itemList', Fetch.itemTypeList())
  }

  doCommand (event: any) {
    if (event.keyCode === 13) {
      const cmdArr = this.$data.cmd.split(' ')
      if (cmdArr.length !== 2) {
        this.$MessageBox.alert('命令格式错误', '提示')
      } else {
        const workType = cmdArr[0]
        const num = cmdArr[1]

        this.$Notification.success({
          title: workType,
          message: `${workType} 出货 ${num} 万件`
        })
      }
      this.$set(this.$data, 'cmd', '')
    }
  }
  addItem () {
    let vm = this
    ItemType.addItem({
      ...this.$data.newItem,
      callback: () => {
        vm.$set(vm.$data, 'newItem', { name: '', price: '' })
        vm.$set(vm.$data, 'addItemDialog', false)
        vm.freshItemList()
      }
    })
  }
  deleteItem (name: string) {
    let vm = this
    this.$MessageBox
      .confirm('确定要删除该型号吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        ItemType.deleteItem({
          name: name,
          callback: () => {
            vm.freshItemList()
          }
        })
      })
  }

  changeName (name: string, event: any) {
    let vm = this
    ItemType.changeName({
      preName: name,
      newName: event.target.value,
      callback: () => {
        vm.freshItemList()
      }
    })
  }

  changePrice (name: string, event: any) {
    let vm = this
    ItemType.changePrice({
      name: name,
      price: event.target.value,
      callback: () => {
        vm.freshItemList()
      }
    })
  }
}
