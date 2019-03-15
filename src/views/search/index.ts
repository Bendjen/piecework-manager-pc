import Vue from 'vue'
import './index.scss'
import { Component } from 'vue-property-decorator'
import { Select, DatePicker, Option, Input } from 'element-ui'
import * as Fetch from '@/utils/Fetch'
import * as Record from '@/utils/Record'
import dayjs from 'dayjs'
import { IRecord } from '@/declare'
import { IChartsItem } from './declare.d'
import G2Init from './g2'

Vue.use(Select)
Vue.use(Option)
Vue.use(Input)
Vue.use(DatePicker)

@Component
export default class Search extends Vue {
  name = 'Search'
  data () {
    return {
      chart: null,
      params: {
        action: 'GOODS_EXPORT',
        staff: '所有',
        type: '所有',
        month: dayjs().format('YYYY-MM')
      },
      actionList: [
        { label: '计单', value: 'PIECE_RECORD' },
        { label: '出货', value: 'GOODS_EXPORT' }
      ],
      staffList: [{ name: '所有' }, ...Fetch.staffList()],
      itemTypeList: [{ name: '所有' }, ...Fetch.itemTypeList()],
      dialogVisible: false,
      chooseData: {
        time: '',
        type: '',
        staff: '',
        num: '',
        action: '',
        timeValue: ''
      }
    }
  }
  mounted () {
    const vm = this
    this.$data.chart = G2Init()
    this.$data.chart.on('interval:click', (env: any) => {
      const { time, type, num, staff, timeValue } = env.data._origin
      if (time !== '合计') {
        vm.$data.dialogVisible = true
        vm.$data.chooseData = {
          time: time,
          type: type,
          staff: staff,
          timeValue: timeValue,
          num: vm.$NP.minus(num[1], num[0])
        }
      }
    })
    if (this.$route.params.action) {
      const { action,type,month } = this.$route.params
      this.$set(this.$data.params,'action',action)
      this.$set(this.$data.params,'type',type)
      this.$set(this.$data.params,'month',month)
      this.filter()
    } else {
      this.filter()
    }
  }

  editRecord () {
    const vm = this
    let { type, num, staff, timeValue } = this.$data.chooseData
    staff = this.$data.params.action === 'GOODS_EXPORT' ? '' : staff
    Record.editRecord({ type, num, staff, time: timeValue })
      .then(res => {
        vm.$data.dialogVisible = false
        vm.filter()
      })
      .catch(e => e)
  }

  deleteRecord () {
    const vm = this
    let { type, num, staff, timeValue } = this.$data.chooseData
    staff = this.$data.params.action === 'GOODS_EXPORT' ? '' : staff
    Record.deleteRecord({ type, num, staff, time: timeValue })
      .then(res => {
        vm.$data.dialogVisible = false
        vm.filter()
      })
      .catch(e => e)
  }

  filter () {
    let { action, staff, type, month } = this.$data.params
    let chartsData: any = []
    if (!staff && action !== 'GOODS_EXPORT') {
      return this.$MessageBox.alert('请先选择员工', '提示')
    } else if (!type) {
      return this.$MessageBox.alert('请先选择工种', '提示')
    } else if (!month) {
      return this.$MessageBox.alert('请先选择月份', '提示')
    }
    if (!action) {
      this.$MessageBox.alert('请先选择类型', '提示')
    } else {
      staff = staff === '所有' ? '' : staff
      type = type === '所有' ? '' : type
      let lastNum = 0
      const pieceRecord = Fetch.recordFilter({
        date: month,
        unit: 'month',
        action: action,
        staff: action === 'GOODS_EXPORT' ? '' : staff,
        type
      })
      pieceRecord.forEach((item: IRecord) => {
        const sameDayNum = pieceRecord.filter(
          (record: IRecord) =>
            dayjs(record.time).format('MM-DD') ===
            dayjs(item.time).format('MM-DD')
        ).length
        if (sameDayNum > 1) {
          chartsData.push({
            time: dayjs(item.time).format('MM-DD HH:mm:ss'),
            timeValue: item.time,
            num: [lastNum, this.$NP.plus(lastNum, item.num)],
            type: item.type,
            staff: item.staff
          })
        } else {
          chartsData.push({
            time: dayjs(item.time).format('MM-DD'),
            num: [lastNum, this.$NP.plus(lastNum, item.num)],
            timeValue: item.time,
            type: item.type,
            staff: item.staff
          })
        }
        lastNum = this.$NP.plus(lastNum, item.num)
      })
      chartsData.push({
        staff: '合计',
        type: '合计',
        time: '合计',
        num: pieceRecord.reduce(
          (pre: number, cur: IChartsItem) => this.$NP.plus(pre, cur.num),
          0
        )
      })
      // this.$data.chartsData = chartsData
      this.$data.chart.changeData(chartsData)
    }
  }
}
