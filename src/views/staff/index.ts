import Vue from 'vue'
import './index.scss'
import { Component } from 'vue-property-decorator'
import { Carousel, CarouselItem, Dialog, DatePicker, Popover, Input } from 'element-ui'
import * as Fetch from '@/utils/Fetch'
import * as Staff from '@/utils/Staff'
import G2Init from './g2'
import dayjs from 'dayjs'

Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(DatePicker)
Vue.use(Input)
Vue.use(Popover)
Vue.use(Dialog)

import { View } from '@antv/data-set'
import { IStaff, IRecord, IItemStaff } from '@/declare'

@Component
export default class Employee extends Vue {
  name = 'Employee'
  data () {
    return {
      charts: [],
      staffList: [],
      month: dayjs().format('YYYY-MM'),
      addStaffDialog: false,
      salaryDialog: false,
      newStaff: {
        name: '',
        short: ''
      },
      salaryList: []
    }
  }
  mounted () {
    this.freshStaffList()
    this.freshSalary()
  }

  changeMonth () {
    this.freshStaffList()
    this.freshSalary()
  }

  freshStaffList (index?: any) {
    const staffList = Fetch.staffList()
    this.$set(this.$data, 'staffList', staffList)
    setTimeout(() => {
      let $carousel: any = this.$refs.carousel
      $carousel.setActiveItem(index || 0)
      this.freshChartsDate()
    }, 100)
  }

  freshSalary () {
    const vm = this
    const itemTypeList = Fetch.itemTypeList()
    const salaryList = Fetch.staffList().map((item: IStaff) => {
      const staffRecord = Fetch.recordFilter({
        date: this.$data.month,
        unit: 'month',
        staff: item.name,
        action: 'PIECE_RECORD'
      }).map((record: IRecord) => {
        return {
          type: record.type,
          num: record.num,
          price: itemTypeList.find((type: IItemStaff) => type.name === record.type).price
        }
      })
      const total = staffRecord.reduce((pre: any, cur: any) => vm.$NP.plus(pre, vm.$NP.times(cur.num, cur.price)), 0)
      return {
        name: item.name,
        detail: staffRecord,
        total: total
      }
    })
    this.$data.salaryList = salaryList
  }

  freshChartsDate () {
    const MonthPieceRecord = Fetch.recordFilter({ date: this.$data.month, unit: 'month', action: 'PIECE_RECORD' })
    const chartsData = this.$data.staffList.map((item: IStaff) => {
      let staffChartsData: any = []
      const staffRecord = MonthPieceRecord.filter((record: IRecord) => record.staff === item.name)
      staffRecord.forEach((record: IRecord) => {
        let targetIndex = staffChartsData.findIndex((data: any) => data['type'] === record.type)
        if (targetIndex === -1) {
          staffChartsData.push({ 'type': record.type, 'num': 0 })
          targetIndex = staffChartsData.length - 1
        }
        staffChartsData[targetIndex]['num'] = this.$NP.plus(staffChartsData[targetIndex]['num'], record.num)
      })
      const dv = new View().source(staffChartsData)
      return dv.rows
    })
    chartsData.forEach((item: any, index: number) => {
      const targetIndex = this.$data.charts.findIndex((chartItem: any) => chartItem.id === `chart${index}`)
      if (targetIndex === -1) {
        const chart = G2Init(`chart${index}`)
        chart.changeData(item)
        this.$set(this.$data.charts, targetIndex, { id: `chart${index}`, chart: chart })
      } else {
        this.$data.charts[targetIndex].chart.changeData(item)
      }
    })
  }

  addStaff () {
    const vm = this
    Staff.add({
      name: this.$data.newStaff.name,
      short: this.$data.newStaff.short
    }).then(lastIndex => {
      vm.freshStaffList(lastIndex)
      vm.$data.addStaffDialog = false
      vm.$data.newStaff = { name: '', short: '' }
    }).catch()
  }

  staffNameChange (primeName: string, e: any) {
    // const reg = /^[\u4e00-\u9fa5]+$/
    // if (!reg.test(e.target.value)) {
    //   this.$MessageBox.alert('请输入中文', '提示')
    //   e.target.value = e.target._value
    //   e.target.focus()
    // } else {
    if (!e.target.value) {
      this.$MessageBox.alert('姓名不能为空', '提示')
      e.target.value = e.target._value
      e.target.focus()
      return false
    }
    Staff.changeName({
      primeName: primeName,
      newName: e.target.value
    }).then(lastIndex => this.freshStaffList(lastIndex)).catch()
    // }
  }

  staffShortChange (primeShort: string, e: any) {
    if (!e.target.value) {
      this.$MessageBox.alert('缩写不能为空', '提示')
      e.target.value = e.target._value
      e.target.focus()
      return false
    }
    Staff.changeShort({
      primeShort: primeShort,
      newShort: e.target.value
    }).then(lastIndex => this.freshStaffList(lastIndex)).catch()
  }

  deleteStaff (name: string) {
    const vm = this
    this.$MessageBox
      .confirm('删除员工将删除所有该员工的相关记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        Staff.remove({
          name: name
        }).then(lastIndex => vm.freshStaffList(lastIndex)).catch()
      })
  }

  computeMoney () {
    this.$data.salaryDialog = true
  }
}
