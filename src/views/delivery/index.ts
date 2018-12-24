import Vue from 'vue'
import './index.scss'
import { Component } from 'vue-property-decorator'
import { Table, TableColumn, Input } from 'element-ui'
import * as ItemType from '@/utils/ItemType'
import * as Fetch from '@/utils/Fetch'
import * as Record from '@/utils/Record'
import { IRecord, IStaff } from '@/declare.d.ts'
import { View } from '@antv/data-set'

interface IExportSummaryItem {
  type: string
  num: string | number
}

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Input)

@Component
export default class Delivery extends Vue {
  name = 'Delivery'
  data () {
    return {
      exportSummary: [],
      addItemDialog: false,
      itemListDialog: false,
      itemList: [],
      cmd: '',
      newItem: { name: '', price: '' },
      scale: [
        {
          dataKey: 'num',
          tickInterval: 50
        }
      ],
      label : [
        'num', {
          labelEmit: true,
          textStyle: {
            fill: '#8c8c8c'
          }
        }
      ],
      color: ['type'],
      height: 600
    }
  }
  mounted () {
    this.freshItemList()
    this.freshTable()
  }

  freshItemList () {
    this.$set(this.$data, 'itemList', Fetch.itemTypeList())
  }

  freshTable () {
    let exportSummary = Fetch.exportSummary(new Date(), 'day')
    this.$set(this.$data,'exportSummary',exportSummary)
    this.$set(this.$data.scale[0],'max',Math.max.apply(Math,exportSummary.map((item: IExportSummaryItem) => item.num)) + 50)
  }

  doCommand (event: any) {
    let vm = this
    if (event.keyCode === 13) {
      const cmdArr = this.$data.cmd.split(' ')
      if (cmdArr.length !== 2) {
        this.$MessageBox.alert('命令格式错误', '提示')
      } else {
        const workType = cmdArr[0]
        const num = cmdArr[1]

        Record.goodsExport({ type: workType, num: num }).then(() => {
          vm.freshTable()
        }).catch(e => e)
      }
      vm.$set(this.$data, 'cmd', '')
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
