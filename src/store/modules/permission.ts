/**
 * @description 权限控制
 */

import { Module, VuexModule, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '../index'
import { RouteConfig } from 'vue-router'
import { constantRoutes, asyncRoutes } from '@/router/routes'

export interface MyPermission {
  routes: RouteConfig[]
  asyncRoutes: RouteConfig[]
  activeKeys: string[]
}

function hasPermission(route: RouteConfig, role: string) {
  if (route.meta && route.meta.role && route.meta.role.length) {
    // 返回是否有 对应权限
    return route.meta.role.includes(role)
  } else {
    // 如果没有设置则为公用
    return true
  }
}

function filterAsyncRoutes(routes: RouteConfig[], role: string) {
  const res: RouteConfig[] = []
  routes.forEach(item => {
    if (hasPermission(item, role)) {
      if (item.children) {
        item.children = filterAsyncRoutes(item.children, role)
      }
      res.push(item)
    }
  })

  return res
}

@Module({ name: 'permission', store, dynamic: true, namespaced: true })
class Permission extends VuexModule implements MyPermission {
  routes: RouteConfig[] = []
  asyncRoutes: RouteConfig[] = []
  activeKeys: string[] = ['indexMenu'] // 默认选中 index

  @Mutation
  SET_ROUTES(routes: RouteConfig[]) {
    this.routes = constantRoutes.concat(routes)
    this.asyncRoutes = routes
  }

  @Mutation
  SET_ACTIVEKEYS(keys: string[]) {
    this.activeKeys = keys
  }

  @Action
  GenerateRoutes(role: string) {
    // 如果是admin，则拿到全部的路由
    let tempRoutes = []
    if (role === 'admin') {
      tempRoutes = asyncRoutes
    } else {
      tempRoutes = filterAsyncRoutes(asyncRoutes, role)
    }
    this.SET_ROUTES(tempRoutes)
  }

  @Action
  SaveActiveKeys(keys: string[]) {
    this.SET_ACTIVEKEYS(keys)
  }
}

export const PermissionModule = getModule(Permission)
