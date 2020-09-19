import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/ant-design/index'
import './assets/styles/global.scss'

// mock接口
import './mock'

// axios
import Axios from 'axios'
Vue.prototype.$Axios = Axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
