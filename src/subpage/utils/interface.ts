/**
 * @description 接口
 */

import { RuleItem, Rules } from 'async-validator'

export interface ObjectPropStr {
  [index: string]: any
}

export interface MyRulesItem extends RuleItem {
  trigger?: string
}

export interface FormModelInter extends Vue {
  model: ModelInterface
  rules: Rules
  labelWidth: string | number
}

export interface ModelInterface {
  [index: string]: string
}

// json配置文件中的 item
export interface ComItemProps {
  typeName: string
  data?: ComItemPropsData
}

export interface ComItemPropsData {
  slots: ComSlotsDataItem[]
  [index: string]: any
}

// json配置文件中，slots相关数据
export interface ComSlotsDataItem {
  name?: string
  content?: any
}

export interface ComJsonData {
  template: string
  componentsData: ComItemProps[]
}

// 所选择的组件名称
export interface SelectedComData {
  name: string
  key: string
}
