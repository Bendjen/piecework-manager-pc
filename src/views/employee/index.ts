import Vue from 'vue'
import './index.scss'
import { Component } from 'vue-property-decorator'
import { Carousel, CarouselItem, Dialog } from 'element-ui'
import * as Fetch from '@/utils/Fetch'
import * as Staff from '@/utils/Staff'

Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Dialog)

import { View } from '@antv/data-set'

const sourceData = [
  {
    name: 'London',
    'Jan.': 18.9,
    'Feb.': 28.8,
    'Mar.': 39.3,
    'Apr.': 81.4,
    May: 47,
    'Jun.': 20.3,
    'Jul.': 24,
    'Aug.': 35.6
  },
  {
    name: 'Berlin',
    'Jan.': 12.4,
    'Feb.': 23.2,
    'Mar.': 34.5,
    'Apr.': 99.7,
    May: 52.6,
    'Jun.': 35.5,
    'Jul.': 37.4,
    'Aug.': 42.4
  }
]

const dv = new View().source(sourceData)
dv.transform({
  type: 'fold',
  fields: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.'],
  key: '月份',
  value: '月均降雨量'
})
const data = dv.rows

@Component
export default class Employee extends Vue {
  name = 'Employee'
  data () {
    return {
      data,
      staffList: [],
      staffName: '清水健',
      height: 380,
      dialogVisible: false
    }
  }
  mounted () {
    this.freshStaffList()
  }

  freshStaffList (index?: number | string) {
    const staffList = Fetch.staffList()
    this.$set(this.$data, 'staffList', staffList)
    setTimeout(() => {
      let $carousel: any = this.$refs.carousel
      $carousel.setActiveItem(index || 0)
    }, 300)
  }

  addStaff () {
    const vm = this
    this.$MessageBox
      .prompt('请输入员工姓名', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[\u4e00-\u9fa5]+$/,
        inputErrorMessage: '请输入中文'
      })
      .then(({ value }: any) => {
        Staff.add({
          name: value,
          callback: (index?: number) => {
            this.freshStaffList(index)
          }
        })
      })
  }

  staffNameChange (primeName: string, e: any) {
    const reg = /^[\u4e00-\u9fa5]+$/
    if (!reg.test(e.target.value)) {
      this.$MessageBox.alert('请输入中文', '提示')
      e.target.value = e.target._value
      e.target.focus()
    } else {
      Staff.changeName({
        primeName: primeName,
        newName: e.target.value,
        callback: (index?: number) => {
          this.freshStaffList(index)
        }
      })
    }
  }

  deleteStaff (name: string) {
    this.$MessageBox
      .confirm('删除员工将删除所有该员工的相关记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        Staff.remove({
          name: name,
          callback: (index?: number) => {
            this.freshStaffList(index)
          }
        })
      })
  }

  computeMoney () {
    this.$data.dialogVisible = true
  }
}
