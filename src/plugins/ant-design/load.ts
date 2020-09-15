/**
 * @description 按需加载ant-design
 */

import Vue from 'vue'
import { Button, Layout, Menu, Icon } from 'ant-design-vue'
;[Button, Layout, Menu, Icon].forEach(item => {
  Vue.use(item)
})
