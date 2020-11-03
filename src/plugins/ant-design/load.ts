/**
 * @description 按需加载ant-design
 */

import Vue from 'vue'
import { Button, Layout, Menu, Icon, FormModel, Input, Row, Col } from 'ant-design-vue'
;[Button, Layout, Menu, Icon, FormModel, Input, Row, Col].forEach(item => {
  Vue.use(item)
})
