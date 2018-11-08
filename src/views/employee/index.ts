import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { Carousel, CarouselItem } from 'element-ui'
Vue.use(Carousel)
Vue.use(CarouselItem)

@Component
export default class Employee extends Vue {
  name = 'Employee'
}
