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
        { year: '1952 年', sales: 38 },
        { year: '1953 年', sales: 38 },
        { year: '1954 年', sales: 38 },
        { year: '1954 年', sales: 38 },
        { year: '1957 年', sales: 38 },
        { year: '1958 年', sales: 38 }
      ],
      scale: [{
        dataKey: 'sales'
        // tickInterval: 20
      }],
      height: 400
    }
  }
}
