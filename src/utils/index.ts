/**
 * @description 一些工具函数
 */

import { RouteConfig } from 'vue-router'

/**
 * @description 将params字符串转化为对象
 */
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

/**
 * @description 根据 name 属性去匹配路由表中符合的路由，并返回他们的父级
 * @param name routes表中的name属性
 * @param pathRoutes routes
 */
export function matchRouteParentName(name: string, pathRoutes: RouteConfig[]): any {
  const findRoute = pathRoutes.find(item => {
    if (item.name === name) {
      return true
    } else {
      if (item.children && item.children.length > 0) {
        return matchRouteParentName(name, item.children)
      }
    }
  })
  return findRoute
}

/**
 * @description 根据路径去匹配路由列表，并返回合适的route
 * @param path 传入的to.path
 * @param pathRoutes routes
 */
export function matchRoutePath(path: string, pathRoutes: RouteConfig[]): any {
  const splitPath = path === '/' ? '/' : path.split('/')
  for (let i = 0; i < pathRoutes.length; i++) {
    const item = pathRoutes[i]
    const itemPath = item.path === '/' ? '/' : item.path.split('/')
    if (item.redirect) {
      if (itemPath === splitPath || itemPath[0] === splitPath[0]) {
        return item
      }
    } else {
      if (itemPath[itemPath.length - 1] === splitPath[splitPath.length - 1]) {
        return item
      } else if (item.children) {
        const res = matchRoutePath(path, item.children)
        if (res) {
          return res
        }
      }
    }
  }
}
