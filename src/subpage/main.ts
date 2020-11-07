/**
 * @description 子页面的入口
 */
import Vue from 'vue'
import Subpage from './index.vue'
import '@/assets/styles/subpage/index.scss'

new Vue({
  render: h => h(Subpage)
}).$mount('#app')
