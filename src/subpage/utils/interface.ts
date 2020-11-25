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

export { Rules }
