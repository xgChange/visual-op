import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/ant-design/index'
import './assets/styles/global.scss'
import Component from 'vue-class-component'

Component.registerHooks([
  'beforeRouteEnter', //进入路由之前
  'beforeRouteLeave', //离开路由之前
  'beforeRouteUpdate'
])

// mock接口
import './mock'

// 权限控制
import './permission.ts'

// axios
import Axios from 'axios'
Vue.prototype.$Axios = Axios
Vue.config.productionTip = false

// 动态改变title
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
