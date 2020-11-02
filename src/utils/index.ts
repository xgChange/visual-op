/**
 * @description 一些工具函数
 */

import { Route, RouteConfig } from 'vue-router'

export function paramsToObj(str: string, reg = /([a-zA-Z0-9]+)=([a-zA-Z0-9]+)/g) {
  const paramsObj: {
    [index: string]: string
  } = {}

  str.replace(reg, (...arg) => {
    const [, $1, $2] = arg
    paramsObj[`${$1}`] = $2
    return ''
  })

  return paramsObj
}

export function matchRouteParentPath(name: string, pathRoutes: RouteConfig[]): any {
  const findRoute = pathRoutes.find(item => {
    if (item.name === name) {
      return true
    } else {
      if (item.children && item.children.length > 0) {
        return matchRouteParentPath(name, item.children)
      }
    }
  })
  return findRoute
}
