import Vue from 'vue'
import './index.scss'
import { Component } from 'vue-property-decorator'
import { Carousel, CarouselItem, Dialog } from 'element-ui'
import * as Fetch from '@/utils/Fetch'
import * as Staff from '@/utils/Staff'
import G2Init from './g2'

Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Dialog)

import { View } from '@antv/data-set'
import { IStaff,IRecord } from '@/declare'

@Component
export default class Employee extends Vue {
  name = 'Employee'
  data () {
    return {
      charts: [],
      staffList: [],
      addStaffDialog: false,
      newStaff: {
        name: '',
        short: ''
      }
    }
  }
  mounted () {
    this.freshStaffList()
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

  freshChartsDate () {
    const MonthPieceRecord = Fetch.recordFilter({ date: new Date(),unit: 'month',action: 'PIECE_RECORD' })
    const chartsData = this.$data.staffList.map((item: IStaff) => {
      let staffChartsData: any = []
      const staffRecord = MonthPieceRecord.filter((record: IRecord) => record.staff === item.name)
      staffRecord.forEach((record: IRecord) => {
        let targetIndex = staffChartsData.findIndex((data: any) => data['type'] === record.type)
        if (targetIndex === -1) {
          staffChartsData.push({ 'type': record.type ,'num': 0 })
          targetIndex = staffChartsData.length - 1
        }
        staffChartsData[targetIndex]['num'] = this.$NP.plus(staffChartsData[targetIndex]['num'],record.num)
      })
      const dv = new View().source(staffChartsData)
      return dv.rows
    })
    chartsData.forEach((item: any,index: number) => {
      const targetIndex = this.$data.charts.findIndex((chartItem: any) => chartItem.id === `chart${index}`)
      if (targetIndex === -1) {
        const chart = G2Init(`chart${index}`)
        chart.changeData(item)
        this.$set(this.$data.charts,targetIndex,{ id: `chart${index}`,chart: chart })
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
      vm.$data.newStaff = { name: '',short: '' }
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
    this.$data.dialogVisible = true
  }
}
