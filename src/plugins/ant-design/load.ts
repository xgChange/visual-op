/**
 * @description 按需加载ant-design
 */

import Vue from 'vue'
import { Button, Layout, Menu, Icon, FormModel, Input, Row, Col, Tabs, Tooltip } from 'ant-design-vue'
;[Button, Layout, Menu, Icon, FormModel, Input, Row, Col, Tabs, Tooltip].forEach(item => {
  Vue.use(item)
})
