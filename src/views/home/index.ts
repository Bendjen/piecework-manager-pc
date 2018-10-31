import Vue from 'vue'
import HelloWorld from '@/components/HelloWorld/index.vue'
import { Component } from 'vue-property-decorator'

@Component({
  components: { HelloWorld }
})

export default class Home extends Vue {
  name = 'home'
}
