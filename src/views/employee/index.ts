import Vue from 'vue'
import './index.scss'
import { Component } from 'vue-property-decorator'
import { Carousel, CarouselItem } from 'element-ui'
Vue.use(Carousel)
Vue.use(CarouselItem)

@Component
export default class Employee extends Vue {
  name = 'Employee'
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
      scale: [{
        dataKey: 'sales'
        // tickInterval: 20
      }],
      height: 400
    }
  }
}
