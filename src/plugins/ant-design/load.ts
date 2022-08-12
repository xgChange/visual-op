/**
 * @description 按需加载ant-design
 */

import Vue from 'vue'
import { Button, Layout, Menu, Icon, FormModel, Input, Row, Col, Tabs, Tooltip, Radio } from 'ant-design-vue'
;[Button, Layout, Menu, Icon, FormModel, Input, Row, Col, Tabs, Tooltip, Radio].forEach(item => {
  Vue.use(item)
})

import { message } from 'ant-design-vue'
Vue.prototype.$message = message
