/**
 * @description 找寻各层级组件的工具方法
 */

/**
 * @description 找到最近的父组件
 */
export function findParentComponent(context: Vue, name: string) {
  let parent = context.$parent

  if (parent) {
    if (parent.$options.name && parent.$options.name === name) {
      return parent
    }
    parent = parent.$parent
    findParentComponent(parent, name)
  } else {
    return []
  }
}
