/**
 * @description 子页面的入口
 */
import Vue from 'vue'
import Subpage from './index'
import '@/assets/styles/subpage/index.scss'
import '@/components/svg/index'

new Vue({
  render: h => h(Subpage)
}).$mount('#app')
